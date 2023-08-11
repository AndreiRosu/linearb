
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./gitstream-core.cjs.production.min.js')
} else {
  module.exports = require('./gitstream-core.cjs.development.js')
}
