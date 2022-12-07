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

2. Add `nuxt2-turnstile` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'nuxt2-turnstile',

    // With options
    ['nuxt2-turnstile', { /* module options */ }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

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
