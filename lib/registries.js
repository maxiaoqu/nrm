const registries = {
  npm: {
    home: "https://www.npmjs.org",
    registry: "https://registry.npmjs.org/"
  },
  cnpm: {
    home: "https://npmmirror.com",
    registry: "https://registry.npmmirror.com/"
  },
  yarn: {
    home: "https://yarnpkg.com",
    registry: "https://registry.yarnpkg.com/"
  },
  tencent: {
    home: "https://mirrors.cloud.tencent.com/npm/",
    registry: "https://mirrors.cloud.tencent.com/npm/"
  },
  huawei: {
    home: "https://mirrors.huaweicloud.com/home",
    registry: "https://repo.huaweicloud.com/repository/npm/"
  },
  npmMirror: {
    home: "https://skimdb.npmjs.com",
    registry: "https://skimdb.npmjs.com/registry/"
  },
  github: {
    home: "https://npm.pkg.github.com/",
    registry: "https://npm.pkg.github.com/"
  },
  ustc: {
    home: "https://mirrors.ustc.edu.cn/help/npm.html",
    registry: "https://npmreg.proxy.ustclug.org/"
  }
}

module.exports = registries
