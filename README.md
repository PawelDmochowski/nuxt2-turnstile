# nuxt2-turnstile

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Cloudflare Turnstile integration for Nuxt 2

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt2-turnstile` dependency to your project

```bash
yarn add nuxt2-turnstile # or npm install nuxt2-turnstile
```

2. Add `nuxt2-turnstile` at the end of `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // ...other modules here
  
    // Simple usage
    'nuxt2-turnstile',

    // With options
    ['nuxt2-turnstile', { /* module options */ }],
  ],

  // add your Cloudflare Turnstile keys using runtime config
  privateRuntimeConfig: {
    turnstile: {
      // DO NOT PUT THIS IN PUBLIC RUNTIME CONFIG
      secretKey: '<your-secret-key>',
    },
  },
  publicRuntimeConfig: {
    turnstile: {
      siteKey: '<your-site-key>',
    },
  },
}
```

## Usage

To use Turnstile, add the auto-imported Vue component in whatever component needs it:

```html
<template>
  <div>
    <form @submit.prevent="onSubmit">
      <Turnstile v-model="token" />
      <input type="submit" />
    </form>
  </div>
</template>
```

It renders the Turnstile `<iframe>` within a `<div>` wrapper by default, but you can configure this by setting the `element` prop.

When in the page, it will automatically load the Turnstile script and validate your user. Each validation lasts for 300s, and `nuxt-turnstile` will automatically revalidate this token after 250s.

You can access the validation token by setting a `v-model` on the component. Then, send the token along with your form responses, either explicitly or automatically (Cloudflare adds a hidden form element with the name `cf-turnstile-response` to your form).

To validate the token on server-side inside your `serverMiddleware`, you can use the `verifyTurnstileToken` utility injected by middleware into `req` object. Validation middleware is inserted by the module as first middleware into `serverMiddleware` array.

```js
app.post('/api', async (req, res) => {
  const { success, 'error-codes': errors } =
    await req.turnstileValidate(req.body.token)
  if (success) {
    // do stuff
  }
  // handle invalid token response
}
```

The turnstile token is no longer valid after being processed with CloudFlare via `verifyTurnstileToken`. If you are using nuxt-turnstile with a component that might need to be validated multiple times, such as a submission form, you will need to regenerate the token for each submission. To manually regenerate the token, nuxt-turnstile exposes the `reset` function directly via a [template ref](https://vuejs.org/guide/essentials/template-refs.html).

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## Thanks

Based on excellent work from [Daniel Roe](https://github.com/danielroe).

## License

[MIT License](./LICENSE)

Copyright (c) Paweł Dmochowski <pawel@dmochowski.co>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt2-turnstile/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt2-turnstile

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt2-turnstile.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt2-turnstile

[github-actions-ci-src]: https://github.com/https://github.com/PawelDmochowski/nuxt2-turnstile.git/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/https://github.com/PawelDmochowski/nuxt2-turnstile.git/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/https://github.com/PawelDmochowski/nuxt2-turnstile.git.svg
[codecov-href]: https://codecov.io/gh/https://github.com/PawelDmochowski/nuxt2-turnstile.git

[license-src]: https://img.shields.io/npm/l/nuxt2-turnstile.svg
[license-href]: https://npmjs.com/package/nuxt2-turnstile
