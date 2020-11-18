module.exports = async function (fastify, opts, next) {

  let Employee = fastify.databases.dbProject.models.Employee

  fastify.post('/employees/retrieve', { preValidation: [fastify.authenticate] }, async function (request, reply) {
    let query = {}
    if (request.body.employeeNumber) {
      query = { employeeNumber: request.body.employeeNumber }
    }
    let employees = await Employee.find(query).lean()
    employees = fastify.redact(request.user.admin, employees)
    reply.send({ success: true, data: { employees } })
  })

  fastify.post('/employees/create', { preValidation: [fastify.authenticate] }, async function (request, reply) {
    let employee = new Employee(request.body)
    await employee.save()
    employee = fastify.redact(request.user.admin, employee._doc, true)

    reply.send({ success: true, data: { employee } })
  })

  fastify.post('/employees/update', { preValidation: [fastify.authenticate] }, async function (request, reply) {
    let employee = await Employee.findOne({ employeeNumber: request.body.employeeNumber })
    if (employee) {
      await employee.set(request.body)
      await employee.save()
      employee = employee._doc
      employee = fastify.redact(request.user.admin, employee._doc, true)
      reply.send({ success: true, message: 'Employee updated' })
    } else {
      reply.send({ success: false, message: 'Employee Number not linked to any employees' })
    }
  })

  fastify.post('/employees/delete', { preValidation: [fastify.authenticate] }, async function (request, reply) {
    await Employee.deleteOne({ employeeNumber: request.body.employeeNumber })
    reply.send({ success: true, message: 'Employee deleted' })
  })

  next()
}
