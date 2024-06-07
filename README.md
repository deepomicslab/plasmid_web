## Use docsify

```bash
yarn install docsify-cli -g
```

```bash
#run in local
/home/ys/.config/yarn/global/node_modules/docsify-cli/bin/docsify serve docs -p 8327
```

```bash
#run in server
/home/platform/.config/yarn/global/node_modules/docsify-cli/bin/docsify serve docs -p 8327
```

## Crux

```
cd ../
git clone git@144.214.37.165:lhc/crux.git
cd crux
yarn install
yarn build
```

## Development

首先进入项目目录

1. 安装前端项目依赖

```bash
yarn install
```

2. 运行前端项目

```bash
yarn run dev
```

## Deployment(for test)

### change the env config

1.set the base api on VITE_BASE_API

```
VITE_BASE_API=XXX.XXX.XXX.XXX:XXXX
```

2.set the preview port

### 安装前端项目依赖&编译

```bash
yarn install
```

```bash
yarn run build
```

### 使用 tmux 临时运行

```bash
#创建终端窗口
tmux new -s phageweb
#退出窗口
ctrl+b  &  d
#重新打开窗口
tmux a -t phageweb
#预览编译结果
yarn run preview
```

### 使用 nohup(建议使用并记住 pid)

```bash
nohup yarn run preview &
```

记得 kill 掉对应进程!!!

```bash
sudo kill xxxx
```

### 修改 apache 配置

```bash
sudo vi /usr/local/apache2/conf/extra/httpd-ssl.conf
```

在文件中添加以下内容：

```
### for test
<VirtualHost *:443>
        ServerName phageapi.deepomics.org
        ProxyPass / http://localhost:8324/
        ProxyPassReverse / http://localhost:8324/
</VirtualHost>

```

重启加载配置

```bash
service apache2 restart
```

查看日志

```bash
tail /usr/local/apache2/logs/error_log
tail /usr/local/apache2/logs/access_log
```
