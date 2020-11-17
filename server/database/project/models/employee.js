const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require(process.env.APP_CONFIG)
const AutoIncrementFactory = require('mongoose-sequence')

const connection = mongoose.createConnection(config.database.uri, config.database.options)

const AutoIncrement = AutoIncrementFactory(connection)

let employeeSchema = new Schema({
  employeeNumber: {
    type: Number,
    index: true,
    unique: true,
  },
  employeeCount: {
    type: Number,
    required: true,
    default: 1
  },
  age: {
    type: Number,
    required: true,
  },
  distanceFromHome: {
    type: Number,
    required: true,
  },
  environmentSatisfaction: {
    type: Number,
    required: true,
  },
  numCompaniesWorked: {
    type: Number,
    required: true,
  },
  percentSalaryHike: {
    type: Number,
    required: true,
  },
  performanceRating: {
    type: Number,
    required: true,
  },
  relationshipSatisfaction: {
    type: Number,
    required: true,
  },
  stockOptionLevel: {
    type: Number,
    required: true,
  },
  workLifeBalance: {
    type: Number,
    required: true,
  },
  trainingTimesLastYear: {
    type: Number,
    required: true,
  },
  yearsAtCompany: {
    type: Number,
    required: true,
  },
  yearsInCurrentRole: {
    type: Number,
    required: true,
  },
  yearsSinceLastPromotion: {
    type: Number,
    required: true,
  },
  yearsWithCurrManager: {
    type: Number,
    required: true,
  },
  totalWorkingYears: {
    type: Number,
    required: true,
  },
  monthlyIncome: {
    type: Number,
    required: true,
  },
  monthlyRate: {
    type: Number,
    required: true,
  },
  dailyRate: {
    type: Number,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  standardHours: {
    type: Number,
    required: true,
  },
  attrition: {
    type: Boolean,
    required: true,
  },
  over18: {
    type: Boolean,
    required: true,
    default: true
  },
  overtime: {
    type: Boolean,
    required: true,
  },
  businessTravel: {
    type: String,
    enum: ['Travel_Frequently', 'Travel_Rarely', 'Non-Travel'],
    required: true,
    default: 'Non-Travel'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced'],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  educationField: {
    type: String,
    required: true,
  },
  education: {
    type: Number,
    required: true,
  },
  jobInvolvement: {
    type: Number,
    required: true,
  },
  jobLevel: {
    type: Number,
    required: true,
  },
  jobSatisfaction: {
    type: Number,
    required: true,
  },

}, { timestamps: true, versionKey: false })

employeeSchema.index({ 'createdAt': -1 })
employeeSchema.plugin(AutoIncrement, { id: 'employee_counter', inc_field: 'employeeNumber', start_seq: 2070 })

module.exports = employeeSchema
