const { resolve, join } = require('path')
const validatorInjection = require('./serverMiddleware/validate')

module.exports = function (moduleOptions) {
  const options = {
    ...this.options.turnstile,
    ...moduleOptions,
  }

  if (!options.namespace) options.namespace = 'turnstile'
  const { namespace } = options

  const pluginsToSync = ['plugin/plugin.js']

  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(namespace, pathString),
      options,
    })
  }

  this.options.serverMiddleware.unshift(validatorInjection(options.secretKey))

  this.nuxt.hook('components:dirs', (dirs) => {
    // Add ./components dir to the list
    dirs.push({
      path: join(__dirname, 'components'),
    })
  })
}

module.exports.meta = require('../package.json')
