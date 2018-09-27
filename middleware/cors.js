module.exports = function middleware (option) {
  const options = option || {}

  const defaults = {
    origin: true,
    methods: 'GET,HEAD,PUT,POST,DELETE',
  }

  const defaultMap = new Map(Object.entries(defaults))
  defaultMap.forEach((value, key) => {
    if (!options[key]) {
      options[key] = defaults[key]
    }
  })

  if (Array.isArray(options.expose)) {
    options.expose = options.expose.join(',')
  }

  if (typeof options.maxAge === 'number') {
    options.maxAge = options.maxAge.toString()
  } else {
    options.maxAge = null
  }

  if (Array.isArray(options.methods)) {
    options.methods = options.methods.join(',')
  }

  if (Array.isArray(options.headers)) {
    options.headers = options.headers.join(',')
  }

  return async function cors (ctx, next) {
    let origin
    const or = options.origin
    if (typeof or === 'string') {
      origin = or
    } else if (or === true) {
      origin = ctx.get('origin') || '*'
    } else if (typeof or === 'function') {
      origin = options.origin(ctx.request)
    }

    if (origin === false) {
      await next()
      return
    }

    ctx.set('Access-Control-Allow-Origin', origin)

    if (options.expose) {
      ctx.set('Access-Control-Expose-Headers', options.expose)
    }

    if (options.maxAge) {
      ctx.set('Access-Control-Max-Age', options.maxAge)
    }

    if (options.credentials === true) {
      ctx.set('Access-Control-Allow-Credentials', 'true')
    }

    ctx.set('Access-Control-Allow-Methods', options.methods)

    let headers
    const header = options.headers

    if (header) {
      headers = header
    } else {
      headers = ctx.get('access-control-request-headers')
    }

    if (headers) {
      ctx.set('Access-Control-Allow-Headers', headers)
    }

    if (ctx.method === 'OPTIONS') {
      ctx.status = 204
    } else {
      await next()
    }
  }
}