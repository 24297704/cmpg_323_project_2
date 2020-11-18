const path = require('path')

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'
if (!process.env.APP_ROOT) process.env.APP_ROOT = path.resolve(__dirname)
if (!process.env.APP_CONFIG) process.env.APP_CONFIG = path.join(process.env.APP_ROOT, 'config', process.env.NODE_ENV)

const config = require(process.env.APP_CONFIG)
const fastify = require('fastify')(config.server.options)
const modules = require('./modules')
const utils = modules.utils

fastify.register(require('fastify-cors'), { origin: '*' })
fastify.decorate('configServer', config.server)
fastify.decorate('appConfig', config)
fastify.decorate('databases', {})
fastify.decorate('redact', utils.redact)
const seeder = require('./data/seeder')

fastify.register(require('./database'), config.database).after(async () => {
  await seeder.seedData(fastify)
})

fastify
  .register(utils.auth)
  .register(require(`./routes`), { prefix: '/api', logLevel: config.routes.logLevel }).after(async () => { })

fastify.setErrorHandler(function (error, request, reply) {
  fastify.log.error(error)
  if (error.statusCode) {
    reply.code(error.statusCode).send({ success: false, error: { name: error.name, message: error.message } })
  } else {
    reply.code(500).send({ success: false, error: { name: error.name, message: error.message } })
  }
})

fastify.setNotFoundHandler(function (request, reply) {
  reply.code(404).send({ success: false, error: { name: 'NotFound', message: 'Not Found' } })
})

fastify.get('/status', { logLevel: 'fatal' }, (request, reply) => {
  const startUsage = process.cpuUsage()
  const data = {
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(startUsage),
    uptime: process.uptime().toFixed(2),
  }
  reply.send({ success: true, data: data })
})

const start = async () => {
  try {
    await fastify.listen(fastify.configServer.port, fastify.configServer.host)
    fastify.log.info(`Started Server in '${process.env.NODE_ENV}' mode on Port ${fastify.configServer.port}!`)
    console.log(fastify.printRoutes())
  } catch (err) {
    console.error(err)
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
