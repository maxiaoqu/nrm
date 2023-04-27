# nrm -- NPM registry manager

- This warehouse use for reference from [Official Warehouse：https://github.com/Pana/nrm](https://github.com/Pana/nrm)
- [简体中文](./README.md) | English

## No1、Install

```shell
$ npm install invm -g
```

## No2、Instructions

- 1、You can use 'nvm xxx'

```shell
$ nvm ls
$ nvm list
$ nvm ping
$ nvm test
$ nvm now
```

- 2、You also can use 'inrm xxx'

```shell
$ inrm ls
$ inrm list
$ inrm ping
$ inrm test
$ inrm now
```

## No3、Example

- The following example takes the 'nvm' command this example
- You also can use the 'invm' command to

### 3.1、output usage information：（'nrm' or 'nrm -h'）

```
$ nrm

Usage: nrm [options] [command]

Options:
  -v, --version              Output the version number
  -h, --help                 Output usage information

Commands:
  ls|list                    List all the registries
  add <name> <url> [home]    Add one custom registry
  use <name>                 Change registry to registry
  rename <name> <newName>    Set custom registry name
  ping|test [name]           Show the response time for one or all registries, default to all registries
  del|delete <name>          Delete one custom registry
  home <registry> [browser]  Open the homepage of registry with optional browser
  set <manager-name> <name>  Set the registries for other package managers，like: npm、yarn、cnpm、pnpm
  now [manager-name]         Display the registries used by the package manager, default to all package managers
```

### 3.2、List all the registries（'nrm ls' or 'nrm list'）

```
$ nrm list

┌──────┬────────────┬──────────────────────────────────────────────┐
│ used │  name      │ registries url                               │
├──────┼────────────┼──────────────────────────────────────────────┤
│  *   │ npm        │ https://registry.npmjs.org/                  │
│  -   │ cnpm       │ https://registry.npmmirror.com/              │
│  -   │ yarn       │ https://registry.yarnpkg.com/                │
│  -   │ tencent    │ https://mirrors.cloud.tencent.com/npm/       │
│  -   │ huawei     │ https://repo.huaweicloud.com/repository/npm/ │
│  -   │ npmMirror  │ https://skimdb.npmjs.com/registry/           │
│  -   │ github     │ https://npm.pkg.github.com/                  │
│  -   │ ustc       │ https://npmreg.proxy.ustclug.org/            │
└──────┴────────────┴──────────────────────────────────────────────┘
```

### 3.3、Add one custom registry（nrm add）

```
$ nrm add yourName http://www.your-registry.com/

成功：  添加注册表 yourName 成功，运行 nrm use yourName 命令以使用yourName镜像源!
```

### 3.4、Change registry to registry（nrm use）

```
$ nrm use yourName

 成功：  镜像源已更改为yourName
```

### 3.5、Set custom registry name（nrm rename）

```
$ nrm rename yourName myName

 成功：  镜像源名称从 yourName 更改为 myName
```

### 3.6、Show the response time for one or all registries, default to all registries（'nrm ping' or' nrm test'）

- 1、default to all registries

```
$ nrm ping

┌──────┬────────────┬────────────────────────────────────────────────┐
│ used │ name       │ response time                                  │
├──────┼────────────┼────────────────────────────────────────────────┤
│  -   │ npm        │ 896 ms                                         │
│  -   │ cnpm       │ 132 ms                                         │
│  -   │ yarn       │ 761 ms                                         │
│  -   │ tencent    │ 563 ms                                         │
│  -   │ huawei     │ 63 ms                                          │
│  -   │ npmMirror  │ 1206 ms                                        │
│  -   │ github     │ 584 ms（获取错误,若这是您的私人镜像源,请忽略）        │
│  -   │ ustc       │ 1223 ms                                        │
│  *   │ myName     │ 39 ms（获取错误,若这是您的私人镜像源,请忽略）         │
└──────┴────────────┴────────────────────────────────────────────────┘
```

- 2、npm registries

```
$ nrm ping npm

┌──────┬────────────┬────────────────────────────────────────────────┐
│ used │ name       │ response time                                  │
├──────┼────────────┼────────────────────────────────────────────────┤
│  -   │ npm        │ 896 ms                                         │
└──────┴────────────┴────────────────────────────────────────────────┘
```

### 3.7、Delete one custom registry（'nrm del' or 'nrm delete）

- Delete used registry

```
$ nrm del myName

 成功：  已成功删除镜像源myName
 成功：  镜像源已更改为'npm'
```

- Delete other registry

```
$ nrm del myName

 成功：  已成功删除镜像源myName
```

### 3.8、Open the homepage of registry with optional browser（nrm home）

```
$ nrm home npm

 成功：  正在打开当前镜像源主页，请看浏览器！
```

### 3.9、Set the registries for other package managers，like: npm、yarn、cnpm、pnpm（nrm set）

```
$ nrm set yarn yarn

 成功：  yarn 包管理器的镜像源设置成 https://registry.npmmirror.com/
```

### 3.10、Display the registries used by the package manager, default to all package managers（nrm now）

- 1、 default to all package managers

```
$ nrm now

┌──────┬──────────┬───────────────────────────────┐
│ used │ package  │ package managers              │
├──────┼──────────┼───────────────────────────────┤
│  ×   │ cnpm     │ -                             │
│  ×   │ pnpm     │ -                             │
│  √   │ yarn     │ https://registry.yarnpkg.com/ │
│  √   │ npm      │ https://registry.npmjs.org/   │
└──────┴──────────┴───────────────────────────────┘
```

- 2、yarn package managers

```
$ nrm now yarn

┌──────┬──────────┬───────────────────────────────┐
│ used │ package  │ package managers              │
├──────┼──────────┼───────────────────────────────┤
│  √   │ yarn     │ https://registry.yarnpkg.com/ │
└──────┴──────────┴───────────────────────────────┘
```

## No4、Registries

* [npm](https://www.npmjs.org)
* [cnpm](https://npmmirror.com)
* [yarn](https://yarnpkg.com)
* [tencent](https://mirrors.cloud.tencent.com/npm/)
* [huawei](https://mirrors.huaweicloud.com/home)
* [npmMirror](https://skimdb.npmjs.com)
* [github](https://npm.pkg.github.com/)
* [ustc](https://mirrors.ustc.edu.cn/help/npm.html)

## No5、LICENSE

MIT
