const configure = [
  'window.loadTurnstile = new Promise(resolve => {',
  '  window.onloadTurnstileCallback = function () {',
  '    resolve();',
  '    delete window.onloadTurnstileCallback;',
  '    delete window.loadTurnstile;',
  '  }',
  '})',
]
  .map((l) => l.trim())
  .join(' ')
const turnstileScript =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback'

export default function ({ $config: config }, inject) {
  const turnstile = {
    loadTurnstile: async () => {
      if (process.server) return
      if (!window.turnstile) {
        if (window.loadTurnstile) {
          return await window.loadTurnstile
        }
        const scriptCf = document.createElement('script')
        scriptCf.id = 'cf-loader'
        scriptCf.setAttribute('src', turnstileScript)
        scriptCf.setAttribute('async', '')
        scriptCf.setAttribute('defer', '')
        const scriptPromise = document.createElement('script')
        scriptPromise.id = 'cf-configure'
        scriptPromise.innerHTML = configure
        document.head.appendChild(scriptPromise)
        document.head.appendChild(scriptCf)
        await window.loadTurnstile
        document.head.querySelector('#cf-configure').remove()
        document.head.querySelector('#cf-loader').remove()
      }
    },
    async render(element, options) {
      if (process.server) return
      await this.loadTurnstile()
      return window.turnstile.render(element, {
        sitekey: config.turnstile && config.turnstile.siteKey,
        ...options,
      })
    },
    async reset(element) {
      if (process.server) return
      await this.loadTurnstile()
      return window.turnstile.reset(element)
    },
  }
  inject('turnstile', turnstile)
}
