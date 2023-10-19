import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import autoExternal from 'rollup-plugin-auto-external';
import { dts } from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';
import packageJson from './package.json';

export default [
  {
    input: 'src/components/export/index.tsx',
    output: [
      {
        file: 'dist/iife/index.js',
        format: 'iife',
        sourcemap: true
      },
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'react-lib'
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      autoExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        browser: true
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      commonjs(),
      babel({
        presets: ['@babel/preset-react'],
        plugins: ['babel-plugin-styled-components']
      }),
      typescript({ tsconfig: './tsconfig.json' }),
      image(),
      postcss({
        extensions: ['.css']
      }),
      terser()
    ]
  },
  {
    input: './src/types/index.d.ts',
    output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
    plugins: [dts(),
      copy({
        targets: [
          { src: 'package.json', dest: 'dist' } // Copy package.json to the dist directory
        ]
      })
    ]
  }
];
