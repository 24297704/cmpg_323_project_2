const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    required: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true, versionKey: false })

userSchema.plugin(passportLocalMongoose)

module.exports = userSchema
