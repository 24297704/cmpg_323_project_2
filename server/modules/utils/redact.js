const redactedFields = [
  'percentSalaryHike',
  'performanceRating',
  'stockOptionLevel',
  'relationshipSatisfaction',
  'workLifeBalance',
  'monthlyIncome',
  'monthlyRate',
  'dailyRate',
  'hourlyRate',
  'standardHours',
]

module.exports = (admin = false, employees = [], object = false) => {
  if (!admin) {
    if (object) {
      for (let field of redactedFields) {
        delete employees[field]
      }
    } else {
      employees = employees.map((employee) => {
        for (let field of redactedFields) {
          delete employee[field]
        }

        return employee
      })
    }
  }

  return employees
}
