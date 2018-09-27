const deploy = require('shipit-better-deploy')
const cnpm = require('shipit-better-cnpm')
const pm = require('shipit-pm')

module.exports = shipit => {
  deploy(shipit)
  cnpm(shipit)
  pm(shipit)

  shipit.initConfig({
    default: {
      workspace: '/tmp/deploy/koa-practice',
      deployTo: '/home/work/koa-practice',
      repositoryUrl: 'https://github.com/meizikeai/koa-practice.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      shallowClone: true,
      pullDataDeploy: true,
      cnpm: {
        compare: true,
        flags: '--production',
        local: false,
        npm: 'cnpm',
        remote: true,
      },
      pm: {
        production: {
          path: '/home/work/koa-practice/current/pm2/production.json',
        },
        development: {
          path: '/home/work/koa-practice/current/pm2/development.json',
        },
      },
    },
    production: {
      servers: ['work@192.168.1.1'],
      branch: 'master',
    },
    development: {
      servers: ['work@192.168.1.1'],
      branch: 'test',
    },
  })
}
