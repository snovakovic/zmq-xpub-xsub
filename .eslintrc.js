module.exports = {
  extends: ['airbnb-base'],
  env: {
    node: true,
    es6: true,
  },
  ecmaFeatures: {
    blockBindings: true,
    templateStrings: true
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-console': 0
  }
};
