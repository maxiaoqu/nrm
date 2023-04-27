#!/usr/bin/env node

const PKG = require('../package.json');
const actions = require('./actions');
const {program} = require('commander');

program
  .command('ls')
  .alias('list')
  .description('列出所有镜像源')
  .action(actions.onList);

program
  .command('add <name> <url> [home]')
  .description('添加自定义镜像源')
  .action(actions.onAdd);

program
  .command('use <name>')
  .description('使用指定名称的镜像源')
  .action(actions.onUse);

program
  .command('rename <name> <newName>')
  .description('更改自定义镜像源名称')
  .action(actions.onRename);

program
  .command('ping [name]')
  .alias('test')
  .description('显示指定镜像源的响应时间，默认所有镜像源')
  .action(actions.onPing);

program
  .command('del <name>')
  .alias('delete')
  .description('删除指定镜像源')
  .action(actions.onDelete);

program
  .command('home <registry> [browser]')
  .description('在选浏览器打开镜像源主页')
  .action(actions.onHome);

program
  .command('set <manager-name> <name>')
  .description('给其他包管理器设置镜像源，如: npm、yarn、cnpm、pnpm')
  .action(actions.onSet)

program
  .command('now [manager-name]')
  .description('显示包管理器当前使用的镜像源, 默认所有包管理器')
  .action(actions.onNow);

program
  .version(PKG.version, '-v, --version', '输出当前插件的版本号');

program
  .option('-h, --help', '显示前插件命令的帮助')
  .action(function () {
    program.outputHelp();
  });

program
  .parse(process.argv);
