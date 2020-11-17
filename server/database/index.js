const fastifyPlugin = require('fastify-plugin')
const mongoose = require('mongoose')

async function Connector (fastify, config) {
  let db

  if (process.env.APP_ENV === 'development') mongoose.set('debug', (coll, method, query, doc, options) => {
    let set = {
      collection: coll,
      method: method,
      query: query
    }

    // console.debug(`[${new Date().getTime()}] MONGODB DEBUG:\n`, set)
  })

  try {
    db = mongoose.createConnection(config.uri, config.options)
    fastify.log.info(`Connected to ${config.name} database`)
    let schemas = require(`./${config.name}`).models
    for (let schema in schemas) {
      db.model(`${schema}`, schemas[schema])
    }
  } catch (error) {
    fastify.log.error(`Could not connect to ${config.name} database`)
    fastify.log.error(error)
    process.exit(1)
  }

  // When successfully connected
  db.on('connected', () => {
    fastify.log.info('Database connection open to ' + config.name)
  })

  // When successfully reconnected
  db.on('reconnected', () => {
    fastify.log.info(`${config.name} Database connection reconnected`)
  })

  // When the connection is disconnected
  db.on('disconnected', () => {
    fastify.log.warn(`${config.name} Database connection disconnected`)
  })

  fastify.addHook('onClose', () => {
    db.close()
  })

  fastify.databases[config.decorator] = db
}

module.exports = fastifyPlugin(Connector)
