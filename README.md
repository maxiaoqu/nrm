# nrm--NPM注册表管理器

- 本仓库借鉴于 [官方仓库：https://github.com/Pana/nrm](https://github.com/Pana/nrm)
- [English](./README-EN.md) | 简体中文

## 一、安装

```shell
$ npm install inrm -g
```

## 二、使用说明

- 1、您可以使用 nrm xxx

```shell
$ nrm ls
$ nrm list
$ nrm ping
$ nrm test
$ nrm now
```

- 2、您也可以使用 inrm xxx

```shell
$ inrm ls
$ inrm list
$ inrm ping
$ inrm test
$ inrm now
```

## 三、示例说明

- 以下示例以 nrm 这个命令为例
- 您也可以使用 inrm 这个命令进行

### 3.1、查看帮助：（nrm 或 nrm -h）

```
$ nrm

Usage: nrm [options] [command]

Options:
  -v, --version              输出当前插件的版本号
  -h, --help                 显示前插件命令的帮助

Commands:
  ls|list                    列出所有镜像源
  add <name> <url> [home]    添加自定义镜像源
  use <name>                 使用指定名称的镜像源
  rename <name> <newName>    更改自定义镜像源名称
  ping|test [name]           显示指定镜像源的响应时间，默认所有镜像源
   del|delete <name>         删除指定镜像源
  home <registry> [browser]  在选浏览器打开镜像源主页
  set <manager-name> <name>  给其他包管理器设置镜像源，如: npm、yarn、cnpm、pnpm
  now [manager-name]         显示包管理器当前使用的镜像源, 默认所有包管理器
```

### 3.2、列出所有镜像源（nrm ls 或 nrm list）

```
$ nrm list

┌──────┬────────────┬──────────────────────────────────────────────┐
│ 状态  │ 镜像源名称   │ 镜像源地址                                     │
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

### 3.3、添加自定义镜像源（nrm add）

```
$ nrm add yourName http://www.your-registry.com/

成功：  添加注册表 yourName 成功，运行 nrm use yourName 命令以使用yourName镜像源!
```

### 3.4、使用指定名称的镜像源（nrm use）

```
$ nrm use yourName

 成功：  镜像源已更改为yourName
```

### 3.5、更改自定义镜像源名称（nrm rename）

```
$ nrm rename yourName myName

 成功：  镜像源名称从 yourName 更改为 myName
```

### 3.6、显示指定镜像源的响应时间，默认所有镜像源（nrm ping 或 nrm test）

- 1、默认所有镜像源

```
$ nrm ping

┌──────┬────────────┬────────────────────────────────────────────────┐
│ 状态  │ 镜像源名称   │ 镜像源响应时间                                   │
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

- 2、npm镜像源

```
$ nrm ping npm

┌──────┬────────────┬────────────────────────────────────────────────┐
│ 状态  │ 镜像源名称   │ 镜像源响应时间                                   │
├──────┼────────────┼────────────────────────────────────────────────┤
│  -   │ npm        │ 896 ms                                         │
└──────┴────────────┴────────────────────────────────────────────────┘
```

### 3.7、删除指定镜像源（nrm del 或 nrm delete）

- 删除正在使用的镜像源时

```
$ nrm del myName

 成功：  已成功删除镜像源myName
 成功：  镜像源已更改为'npm'
```

- 删除其他镜像源时

```
$ nrm del myName

 成功：  已成功删除镜像源myName
```

### 3.8、在选浏览器打开镜像源主页（nrm home）

```
$ nrm home npm

 成功：  正在打开当前镜像源主页，请看浏览器！
```

### 3.9、给其他包管理器设置镜像源，如: npm、yarn、cnpm、pnpm（nrm set）

```
$ nrm set yarn yarn

 成功：  yarn 包管理器的镜像源设置成 https://registry.npmmirror.com/
```

### 3.10、显示包管理器当前使用的镜像源, 默认所有包管理（nrm now）

- 1、默认所有包管理

```
$ nrm now

┌──────┬──────────┬───────────────────────────────┐
│ 状态  │ 包管理器  │ 包管理器镜像源                   │
├──────┼──────────┼───────────────────────────────┤
│  ×   │ cnpm     │ -                             │
│  ×   │ pnpm     │ -                             │
│  √   │ yarn     │ https://registry.yarnpkg.com/ │
│  √   │ npm      │ https://registry.npmjs.org/   │
└──────┴──────────┴───────────────────────────────┘
```

- 2、yarn包管理

```
$ nrm now yarn

┌──────┬──────────┬───────────────────────────────┐
│ 状态  │ 包管理器  │ 包管理器镜像源                   │
├──────┼──────────┼───────────────────────────────┤
│  √   │ yarn     │ https://registry.yarnpkg.com/ │
└──────┴──────────┴───────────────────────────────┘
```

## 四、镜像源

* [npm](https://www.npmjs.org)
* [cnpm](https://npmmirror.com)
* [yarn](https://yarnpkg.com)
* [tencent](https://mirrors.cloud.tencent.com/npm/)
* [huawei](https://mirrors.huaweicloud.com/home)
* [npmMirror](https://skimdb.npmjs.com)
* [github](https://npm.pkg.github.com/)
* [ustc](https://mirrors.ustc.edu.cn/help/npm.html)

## 五、许可证

MIT
