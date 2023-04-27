const fs = require('fs');
const ini = require('ini');
const chalk = require('chalk');
const consoleGrid = require("console-grid");
const {exec} = require('child_process');
const process = require('./process');
const {
  NRMRC,
  NPMRC,
  REGISTRY,
  REGISTRIES,
  LISTCOLUMNS,
  PINGCOLUMNS,
  NOWCOLUMNS,
  PACKAGEMANAGER
} = require('./constants');

function padding(message = '', before = 1, after = 1) {
  return new Array(before).fill(' ').join('') + message + new Array(after).fill(' ').join('');
}

function exit(error) {
  error && printError(error);
  process.exit(1);
}

function printMessages(rows, type) {
  if (!type) {
    printError(`未找得到 ${chalk.green.bold(type)} 命令`)
    return
  }
  let columns = type === 'list' ? LISTCOLUMNS : type === 'ping' ? PINGCOLUMNS : NOWCOLUMNS
  consoleGrid({columns, rows});
}

function printSuccess(message) {
  console.log(chalk.bgGreenBright(padding('成功：')) + ' ' + message);
}

function printError(error) {
  console.error(chalk.bgRed(padding('错误：')) + ' ' + chalk.red(error));
}


function isLowerCaseEqual(str1, str2) {
  if (str1 && str2) {
    return str1.toLowerCase() === str2.toLowerCase();
  } else {
    return !str1 && !str2;
  }
}

async function readFile(file) {
  return new Promise(resolve => {
    if (!fs.existsSync(file)) {
      resolve({});
    } else {
      try {
        const content = ini.parse(fs.readFileSync(file, 'utf-8'));
        resolve(content);
      } catch (error) {
        exit(error);
      }
    }
  });
}

async function writeFile(path, content) {
  return new Promise(resolve => {
    try {
      fs.writeFileSync(path, ini.stringify(content));
      resolve();
    } catch (error) {
      exit(error);
    }
  });
}

async function getRegistries() {
  const customRegistries = await readFile(NRMRC);
  return Object.assign({}, REGISTRIES, customRegistries);
}

async function getCurrentRegistry() {
  const npmrc = await readFile(NPMRC);
  return npmrc[REGISTRY];
}

async function isRegistryNotFound(name, printErr = true) {
  const registries = await getRegistries();
  if (!Object.keys(registries).includes(name)) {
    printErr && printError(`找不到 ${chalk.red.bold(name)} 镜像源`);
    return true;
  }
  return false;
}

async function isInternalRegistry(name, handle) {
  if (Object.keys(REGISTRIES).includes(name)) {
    handle && printError(`您不能 ${chalk.red.bold(handle)} 内部的镜像源`);
    return true;
  }
  return false;
}

function getCurrentManager(managerName, callback) {
  let managerArr = !managerName ? PACKAGEMANAGER : [managerName];
  // 表示列出当前所有包管理器的镜像源也就是同时列出 yarn, npm, pnpm 各自的镜像源
  let commands = []
  managerArr.forEach((manager, index) => {
    const shellStr = `${manager} config get registry`;
    exec(shellStr, (err, current) => {
      if (err) {
        commands.push({name: manager, registry: '-', isRegistry: false})
      } else {
        const registry = current.replace(/\r|\n/g, '');
        commands.push({name: manager, registry: registry, isRegistry: true})
      }
      if (commands.length === managerArr.length) {
        callback(commands)
      }
    })
  });
}

/**
 * 获取指定的包管理器当前使用的镜像源
 */
function setManagerRegistry(managerName, registryName, registries, callBack) {
  const packageManagerExsitCommand = `${managerName} --version`;
  exec(packageManagerExsitCommand, (err) => {
    if (err) {
      console.log(`您本地没有安装 ${managerName} 包管理器!`);
      return;
    }
    const registry = registries[registryName];
    const setCommand = `${managerName} config set registry ${registry.registry}`;
    exec(setCommand, (err) => {
      if (err) {
        callBack(false, err)
      } else {
        callBack(true, err)
      }
    });
  });
}

module.exports = {
  exit,
  printMessages,
  printSuccess,
  printError,
  isLowerCaseEqual,
  readFile,
  writeFile,
  getRegistries,
  getCurrentRegistry,
  isRegistryNotFound,
  isInternalRegistry,
  getCurrentManager,
  setManagerRegistry
};
