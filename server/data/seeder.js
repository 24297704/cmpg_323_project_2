const csv = require('csvtojson')
const path = require('path')

async function seedData (fastify) {
  let bulkOps = []
  let employeeData = await csv().fromFile(path.join(process.env.APP_ROOT, 'data', 'initial_data.csv'))
  employeeData = mapEmployeeData(employeeData)

  for (let employee of employeeData) {
    bulkOps.push({
      updateOne: {
        filter: { employeeNumber: employee.employeeNumber },
        update: employee,
        upsert: true
      }
    })
  }

  let Employee = fastify.databases.dbProject.models.Employee

  Employee.bulkWrite(bulkOps).then(async () => {
    fastify.log.info('Data seeded')
  }).catch((err) => {
    fastify.log.error(err)
  })
}

function mapEmployeeData (employeeData) {
  return employeeData.map((employee) => {
    return {
      age: Number(employee['Age']),
      dailyRate: Number(employee['DailyRate']),
      distanceFromHome: Number(employee['DistanceFromHome']),
      education: Number(employee['Education']),
      employeeCount: Number(employee['EmployeeCount']),
      employeeNumber: Number(employee['EmployeeNumber']),
      environmentSatisfaction: Number(employee['EnvironmentSatisfaction']),
      hourlyRate: Number(employee['HourlyRate']),
      jobInvolvement: Number(employee['JobInvolvement']),
      jobLevel: Number(employee['JobLevel']),
      jobSatisfaction: Number(employee['JobSatisfaction']),
      monthlyIncome: Number(employee['MonthlyIncome']),
      monthlyRate: Number(employee['MonthlyRate']),
      numCompaniesWorked: Number(employee['NumCompaniesWorked']),
      percentSalaryHike: Number(employee['PercentSalaryHike']),
      performanceRating: Number(employee['PerformanceRating']),
      relationshipSatisfaction: Number(employee['RelationshipSatisfaction']),
      standardHours: Number(employee['StandardHours']),
      stockOptionLevel: Number(employee['StockOptionLevel']),
      totalWorkingYears: Number(employee['TotalWorkingYears']),
      trainingTimesLastYear: Number(employee['TrainingTimesLastYear']),
      workLifeBalance: Number(employee['WorkLifeBalance']),
      yearsAtCompany: Number(employee['YearsAtCompany']),
      yearsInCurrentRole: Number(employee['YearsInCurrentRole']),
      yearsSinceLastPromotion: Number(employee['YearsSinceLastPromotion']),
      yearsWithCurrManager: Number(employee['YearsWithCurrManager']),
      attrition: employee['Attrition'] === 'Yes',
      over18: employee['Over18'] === 'Y',
      overtime: employee['OverTime'] === 'Yes',
      businessTravel: employee['BusinessTravel'],
      department: employee['Department'],
      educationField: employee['EducationField'],
      gender: employee['Gender'],
      jobRole: employee['JobRole'],
      maritalStatus: employee['MaritalStatus'],
    }
  })
}

module.exports = {
  seedData
}
