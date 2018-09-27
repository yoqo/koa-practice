const fs = require('fs')
const path = require('path')
const logger = require('bd-logger')
const Router = require('koa-router')

class LuckyLoader {
  loader (path) {
    const dir = fs.readdirSync(path)
    return dir.map(filename => {
      const module = require(`${path}/${filename}`)
      return { name: filename.split('.')[0], module }
    })
  }

  folder (filename) {
    const dir = path.join(__dirname, filename)
    return this.loader(dir)
  }
}

module.exports = (app, opt) => {
  if (typeof app !== 'object') {
    throw new Error(`'app' object is not callable`)
  }

  const options = opt || {}
  const defaults = {
    controller: '../servers/controller',
    routers: '../servers/routers',
    service: '../servers/service',
  }
  const defaultMap = new Map(Object.entries(defaults))
  defaultMap.forEach((value, key) => {
    if (!options[key]) {
      options[key] = defaults[key]
    }
  })

  app.controller = {}
  app.router = new Router()

  const lucky = new LuckyLoader()
  const controllers = lucky.folder(options.controller)
  controllers.forEach(crl => {
    app.controller[crl.name] = crl.module
  })

  const pack = {}
  const url = path.join(__dirname, options.routers)
  const routers = require(url)(app)

  lucky.folder(options.service).forEach(service => {
    pack[service.name] = service.module
  })

  const root = path.join(__dirname, '../')

  Object.keys(routers).forEach(key => {
    const [method, path] = key.split(' ')
    app.router[method](path, async (ctx, next) => {
      const handler = routers[key]
      await handler(ctx, { logger: logger({ root }), next, pack })
    })
  })

  return app.router.routes()
}
