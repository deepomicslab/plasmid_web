# 需要用到的工具和插件

## 安装 node 和 yarn：

> **Node 14** is enough for junior developper, however, if you have multiple projects to work on, you might want to install **NVM** to help manage your Node versions.

1. install **[Node](https://nodejs.org/en/download/package-manager/)** 14, either directly install or install via **[NVM](https://github.com/nvm-sh/nvm#install--update-script)**

```bash
# Ubuntu directly install node 14
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# or using nvm
# you might need to manually set the environment
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 14.17.0
```

2. install yarn **[Yarn](https://yarnpkg.com/en/docs/install)**

```bash
npm install --global yarn
```

## 启动项目

首先进入项目目录

1. 安装前端项目依赖

```bash
yarn install
```

2. 运行前端项目

```bash
yarn run dev
```

### use tmux

```bash
tmux new -s edu_web
tmux a -t edu_web
```

### Build & preview

```bash


yarn run build

yarn run preview
```

/home/ys/.config/yarn/global/node_modules/docsify-cli/bin/docsify serve docs -p 8327

/usr/local/apache2/logs/error_log
/usr/local/apache2/logs/access_log

/home/platform/.config/yarn/global/node_modules/docsify-cli/bin/docsify serve docs -p 8327
/home/ys/.config/yarn/global/node_modules/docsify-cli/bin/docsify serve docs -p 8327
