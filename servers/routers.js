module.exports = app => {
  const result = {
    'get /': app.controller.common.index,
    'get /403': app.controller.common.forbidden,
    'get /404': app.controller.common.notFound,
    'get /json': app.controller.common.json,
    'get /string': app.controller.common.string,
  }

  return result
}