const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');

const packageJson = require('./package.json');

const sharedPlugins = [
  resolve(),
  commonjs(),
  typescript({ tsconfig: './tsconfig.json' }),
  terser(),
];

const sharedExternals = [
  'react',
  'react-dom',
  'react-native',
  'react-native-svg',
];

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: sharedPlugins,
    external: sharedExternals,
  },
  {
    input: 'src/index.native.ts',
    output: [
      {
        file: 'dist/index.native.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/index.native.esm.js',
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: sharedPlugins,
    external: sharedExternals,
  },
];
