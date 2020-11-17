module.exports = async function (fastify, opts, next) {

  fastify.post('/auth/register', async function (request, reply) {
    let User = fastify.databases.dbProject.models.User
    let user = new User({
      username: request.body.username,
      name: request.body.name,
      surname: request.body.surname,
      admin: request.body.admin,
    })
    await user.setPassword(request.body.password)
    await user.save()
    user = user._doc
    reply.send({ success: true, data: { loginData: { ...user, token: fastify.jwt.sign({ ...user }) } } })
  })

  fastify.post('/auth/login', async function (request, reply) {
    let User = fastify.databases.dbProject.models.User
    try {
      let { user } = await User.authenticate()(request.body.username, request.body.password)

      user = user._doc
      reply.send({ success: true, data: { loginData: { ...user, token: fastify.jwt.sign({ ...user }) } } })
    } catch (err) {
      fastify.log.error(err)
      reply.code(401).send({ success: false, error: err })
    }
  })

  fastify.post('/auth/token', { preValidation: [fastify.authenticate] }, async function (request, reply) {
    reply.send({ success: true, data: { tokenData: { user: request.user } } })
  })

  next()
}
