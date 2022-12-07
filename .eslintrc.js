module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
  },
  extends: ['@nuxtjs', 'prettier'],
  rules: {
    'vue/require-explicit-emits': 'off',
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      }
    }
  ]
}
