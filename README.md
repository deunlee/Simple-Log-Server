# Simple-Log-Server

```sh
git clone https://github.com/deunlee/Simple-Log-Server log-server
cd log-server
npm install
npm install pm2 -g
```

```sh
pm2 start src/app.js
pm2 restart all
pm2 delete all
```
