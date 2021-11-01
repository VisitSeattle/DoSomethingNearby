module.exports = {
  apps: [
    {
      name: 'VisitSeattleDoSomething',
      exec_mode: 'cluster',
      autorestart: true,
      watch: ["server", "client"],
      // Delay between restart
      watch_delay: 1000,
      instances: 4, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      //script: './.nuxt/index.js',
      args: 'start'
    }
  ]
}