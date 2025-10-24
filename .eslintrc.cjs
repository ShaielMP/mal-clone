module.exports = {
  env: {
    node: true,
    es2022: true
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:security/recommended',
    'prettier'
  ],
  plugins: ['node', 'security'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off', 
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': 'off',
    'security/detect-object-injection': 'off'
  }
};