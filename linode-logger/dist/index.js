
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./linode-logger.cjs.production.min.js')
} else {
  module.exports = require('./linode-logger.cjs.development.js')
}
