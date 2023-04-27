const path = require('path');
const REGISTRIES = require('./registries');

const HOME = 'home';
const AUTH = '_auth';
const EMAIL = 'email';
const REGISTRY = 'registry';
const REPOSITORY = 'repository';
const ALWAYS_AUTH = 'always-auth';
const REGISTRY_ATTRS = [REGISTRY, HOME, AUTH, ALWAYS_AUTH];
const NRMRC = path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');
const NPMRC = path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], '.npmrc');

const LISTCOLUMNS = [{name: "状态"}, {name: "镜像源名称"}, {name: "镜像源地址"}];
const PINGCOLUMNS = [{name: "状态"}, {name: "镜像源名称"}, {name: "镜像源响应时间"}];
const NOWCOLUMNS = [{name: "状态"}, {name: "包管理器"}, {name: "包管理器镜像源"}];
const PACKAGEMANAGER = ['npm', 'cnpm', 'pnpm', 'yarn'];

module.exports = {
  NRMRC,
  NPMRC,
  REGISTRIES,
  AUTH,
  ALWAYS_AUTH,
  REPOSITORY,
  REGISTRY,
  HOME,
  EMAIL,
  REGISTRY_ATTRS,
  LISTCOLUMNS,
  PINGCOLUMNS,
  NOWCOLUMNS,
  PACKAGEMANAGER
};
