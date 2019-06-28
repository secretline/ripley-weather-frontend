const config = require('./config')

exports.get = key => process.env[key] || config[key]

exports.set = (key, value) => {
  process.env[key] = value
}
