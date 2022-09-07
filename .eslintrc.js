module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended', 'vue-global-api', './.eslintrc-auto-import.json'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  globals: {
    defineOptions: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': 'off',
  },
}
