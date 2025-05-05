const path = require('path');
const { override, addBabelPlugins, addBabelPresets, babelInclude, useBabelRc } = require('customize-cra');

module.exports = override(
  // Use the .babelrc file
  useBabelRc(),
  
  // Add Babel plugins
  ...addBabelPlugins(
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-nullish-coalescing-operator',
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ),
  
  // Include node_modules for transpilation
  babelInclude([
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/@mui')
  ])
);
