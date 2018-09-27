module.exports = {
  async index (ctx, opt) {
    const { logger, next, pack } = opt

    const info = await pack.common.getInfo()
    console.log(info)

    logger.access(ctx, info)

    const result = {
      title: 'Hello Koa 2!',
    }
    const response = Object.assign({
      menu: true,
      sharebar: true,
    }, result)

    await ctx.render('index', response)
    await next()
  },

  async notFound (ctx) {
    await ctx.render('error', { status: '404', message: 'Not Found' })
  },

  async forbidden (ctx) {
    await ctx.render('error', { status: '403', message: 'Forbidden' })
  },

  async json (ctx) {
    ctx.body = {
      title: 'koa2 json',
    }
  },

  async string (ctx) {
    ctx.body = 'koa2 string'
  },
}
