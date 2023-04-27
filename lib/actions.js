const chalk = require('chalk');
const fetch = require('node-fetch');
const open = require('open');

const {
  exit,
  readFile,
  writeFile,
  printMessages,
  printSuccess,
  printError,
  getCurrentRegistry,
  getRegistries,
  isLowerCaseEqual,
  isRegistryNotFound,
  isInternalRegistry,
  getCurrentManager,
  setManagerRegistry
} = require('./helpers');

const {NRMRC, NPMRC, AUTH, EMAIL, ALWAYS_AUTH, REPOSITORY, REGISTRY, HOME} = require('./constants');

async function onList() {
  const currentRegistry = await getCurrentRegistry();
  const registries = await getRegistries();
  const keys = Object.keys(registries);
  const messages = keys.map(key => {
    const registry = registries[key];
    const isEqual = isLowerCaseEqual(registry[REGISTRY], currentRegistry)
    const prefix = isEqual ? chalk.green.bold(' *') : ' -';
    const keyName = isEqual ? chalk.green.bold(key) : key;
    const registryName = isEqual ? chalk.green.bold(registry[REGISTRY]) : registry[REGISTRY];
    return [prefix, keyName, registryName];
  });
  printMessages(messages, 'list');
}

async function onAdd(name, url, home) {
  const registries = await getRegistries();
  const registryNames = Object.keys(registries);
  const registryUrls = registryNames.map(name => registries[name][REGISTRY]);
  if (registryNames.includes(name) || registryUrls.some(eachUrl => isLowerCaseEqual(eachUrl, url))) {
    printError(`镜像源的 ${chalk.green.bold('name')} 或 ${chalk.green.bold('url')} 已存在，请确保 ${chalk.green.bold('name')} 和 ${chalk.green.bold('url')} 是唯一性！`);
    return
  }

  const newRegistry = {};
  newRegistry[REGISTRY] = /\/$/.test(url) ? url : url + '/';
  if (home) {
    newRegistry[HOME] = home;
  }
  const customRegistries = await readFile(NRMRC);
  const newCustomRegistries = Object.assign(customRegistries, {[name]: newRegistry});
  await writeFile(NRMRC, newCustomRegistries);
  printSuccess(`添加注册表 ${name} 成功，运行 ${chalk.green.bold('nrm use ' + name)} 命令以使用 ${name} 镜像源!`);
}

async function onUse(name) {
  if (await isRegistryNotFound(name)) {
    return;
  }
  const registries = await getRegistries();
  const registry = registries[name];
  const npmrc = await readFile(NPMRC);
  await writeFile(NPMRC, Object.assign(npmrc, registry));
  printSuccess(`镜像源已更改为 ${name}`);
}

async function onRename(name, newName) {
  if (await isRegistryNotFound(name) || await isInternalRegistry(name, 'rename')) {
    return;
  }
  if (name === newName) {
    printError('新镜像源名称和现在的不能一样');
    return
  }
  if (!await isRegistryNotFound(newName, false)) {
    return exit(`新镜像源名称 ${chalk.green.bold(newName)} 已存在`);
  }
  const customRegistries = await readFile(NRMRC);
  customRegistries[newName] = JSON.parse(JSON.stringify(customRegistries[name]));
  delete customRegistries[name];
  await writeFile(NRMRC, customRegistries);
  printSuccess(`镜像源名称从 ${chalk.green.bold(name)} 更改为 ${chalk.green.bold(newName)}`);
}

async function onDelete(name) {
  if (await isRegistryNotFound(name) || await isInternalRegistry(name, 'delete')) {
    return;
  }
  const customRegistries = await readFile(NRMRC);
  const registry = customRegistries[name];
  delete customRegistries[name];
  await writeFile(NRMRC, customRegistries);
  printSuccess(`已成功删除镜像源 ${chalk.green.bold(name)}`);
  const currentRegistry = await getCurrentRegistry();
  if (currentRegistry === registry[REGISTRY]) {
    await onUse('npm');
  }
}

async function onPing(target) {
  const registries = await getRegistries();
  const timeout = 5000;

  if (target && await isRegistryNotFound(target)) {
    return exit();
  }

  const sources = target ? {[target]: registries[target]} : registries;

  const results = await Promise.all(Object.keys(sources).map(async name => {
    const {registry} = sources[name];
    const start = Date.now();
    let status = false;
    let isTimeout = false;
    try {
      const response = await fetch(registry + 'nrm', {timeout});
      status = response.ok;
    } catch (error) {
      isTimeout = error.type === '请求超时';
    }
    return {
      name,
      registry,
      success: status,
      time: Date.now() - start,
      isTimeout
    };
  }));

  const [fastest] = results.filter(each => each.success).map(each => each.time).sort((a, b) => a - b);

  const messages = [];
  const currentRegistry = await getCurrentRegistry();
  const errorMsg = chalk.red('（获取错误,若这是您的私人镜像源,请忽略）');
  const timeoutMsg = chalk.yellow(`（提取超时 ${chalk.red.bold(timeout)} ms）`);
  results.forEach(({registry, success, time, name, isTimeout}) => {
    const isFastest = time === fastest;
    const isEqual = registry === currentRegistry
    const prefix = isEqual ? chalk.green.bold(' *') : ' -';
    const keyName = isEqual ? chalk.green.bold(name) : name;
    let suffix = isEqual ? chalk.green.bold(`${time} ms`) : (isFastest && !target) ? chalk.bgGreenBright(time + ' ms') : isTimeout ? '超时' : `${time} ms`;
    if (!success) {
      suffix += isTimeout ? timeoutMsg : errorMsg;
    }
    const suffixName = isEqual ? chalk.green.bold(suffix) : suffix;
    messages.push([prefix, keyName, suffixName]);
  });
  printMessages(messages, 'ping');
  return messages;
}

async function onHome(name, browser) {
  if (await isRegistryNotFound(name)) {
    return;
  }
  const registries = await getRegistries();
  if (!registries[name][HOME]) {
    return exit(`找不到镜像源 ${chalk.green.bold(name)} 的主页，可能没有配置`);
  }
  open(registries[name][HOME], browser ? {app: {name: browser}} : undefined);
}

async function onSet(managerName, registryName) {
  const registries = await getRegistries();
  const registryNames = Object.keys(registries);
  if (!registryNames.includes(registryName)) {
    printError(`找不到镜像源 ${chalk.green.bold(registryName)}`)
    return
  }
  setManagerRegistry(managerName, registryName, registries, (success, error) => {
    if (success) {
      printSuccess(`${chalk.green.bold(managerName)}包管理器的镜像源设置成 ${chalk.green.bold(registries[registryName])}`)
    } else {
      printError(`${chalk.red.bold(error)}`)
    }
  })
}

function onNow(managerName) {
  let messages = []
  getCurrentManager(managerName, (registry) => {
    registry.forEach((manager) => {
      let isRegistry = manager.isRegistry
      let Used = isRegistry ? chalk.green.bold(' √') : ' ×';
      let Name = isRegistry ? chalk.green.bold(manager.name) : manager.name;
      let Registry = isRegistry ? chalk.green.bold(manager.registry) : manager.registry;
      messages.push([Used, Name, Registry])
    })
    printMessages(messages, 'now');
  })
}

module.exports = {
  onList,
  onAdd,
  onUse,
  onRename,
  onPing,
  onDelete,
  onHome,
  onSet,
  onNow
};
