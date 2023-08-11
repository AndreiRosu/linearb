
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./gitstream-rule-parser.cjs.production.min.js')
} else {
  module.exports = require('./gitstream-rule-parser.cjs.development.js')
}
