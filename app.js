const Koa = require('koa')
const path = require('path')
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const helmet = require('koa-helmet')
const views = require('koa-views')
const koabody = require('koa-body')
const compress = require('koa-compress')
const bodyparser = require('koa-bodyparser')
const cors = require('./middleware/cors')
const lucky = require('./middleware/lucky')

const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(json())

// logger
app.use(logger())

app.use(helmet())
app.use(compress())

// cors
app.use(cors({
  // origin: '*',
  // methods: 'POST, GET, OPTIONS',
}))

// body, files
app.use(koabody({ multipart: true }))
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))

// public
app.use(require('koa-static')(path.join(__dirname, '/public')))

// views
app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }))

// routes
app.use(lucky(app))

// 404､403
app.use(async (ctx, next) => {
  await next()

  const { status } = ctx
  const accepts = ctx.accepts('html', 'json')
  const result = {
    json: {
      code: status,
      message: status === 403 ? 'Forbidden' : 'Page Not Found',
    },
    text: {
      type: 'text',
      body: status === 403 ? 'Forbidden' : 'Page Not Found',
    },
  }

  if (status === 404 || status === 403) {
    if (accepts === 'html') {
      ctx.redirect(`/${status}`)
      return false
    } else if (accepts === 'json') {
      ctx.body = result.json
      return false
    } else {
      ctx.type = result.text.type
      ctx.body = result.text.body
      return false
    }
  }
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
