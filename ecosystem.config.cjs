module.exports = {
  apps: [
    {
      name: 'livmarolf',
      port: '3003',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
