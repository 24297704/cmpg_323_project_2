const { readdir, stat } = require('fs').promises
const { join } = require('path')

const getAllRouteDirectories = async (path) => {
  let dirs = []
  for (const file of await readdir(path)) {
    if ((await stat(join(path, file))).isDirectory()) {
      dirs = [...dirs, file]
    }
  }
  return dirs
}

module.exports = async function (fastify, opts, next) {
  fastify.get('/', function (request, reply) {
    reply.send({ root: true })
  })

  let routes = await getAllRouteDirectories(`${process.env.APP_ROOT}/routes`)

  for (let route of routes) {
    fastify.register(require(`${process.env.APP_ROOT}/routes/${route}`))
  }

  next()
}
