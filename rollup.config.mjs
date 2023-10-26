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

export default [
  {
    input: 'src/components/export/index.tsx',
    output: [
      {
        file: 'build/dist/iife/index.js',
        format: 'iife',
        sourcemap: true
      },
      {
        file: 'build/dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'build/dist/esm/index.js',
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
      terser({
        format: {
          comments: false // Remove comments from the output
        },
        sourceMap: false // Disable source maps for production build
      })
    ]
  },
  {
    input: './src/types/index.d.ts',
    output: [{ file: 'build/dist/types/index.d.ts', format: 'es' }],
    plugins: [dts(),
      copy({
        targets: [
          { src: 'package.json', dest: 'build/' }, // Copy package.json to the dist directory
          { src: 'README.md', dest: 'build/' } // Copy package.json to the dist directory
        ]
      })
    ]
  }
];
