module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-nullish-coalescing-operator',
    '@babel/plugin-proposal-private-property-in-object',
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ]
};
