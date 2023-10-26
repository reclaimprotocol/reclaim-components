import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import { dts } from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'build/dist/iife/index.js',
        format: 'iife',
        sourcemap: true
      },
      {
        file: 'build/dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
        name: 'react-lib'
      },
      {
        file: 'build/dist/esm/index.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        browser: true // To resolve browser-specific imports
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      commonjs(),
      babel({
        presets: ['@babel/preset-react']
      }),
      typescript({ tsconfig: './tsconfig.json' }),
      image(),
      postcss({
        extensions: ['.css']
      }),
      terser(),
      serve({
        open: true,
        verbose: true,
        contentBase: [''],
        host: 'localhost',
        port: 3001
      }),
      livereload({ watch: 'dist' })
    ]
  },
  {
    input: './src/types/index.d.ts',
    output: [{ file: 'build/dist/types/index.d.ts', format: 'es' }],
    plugins: [dts(),
      copy({
        targets: [
          { src: 'package.json', dest: 'build/' }, // Copy package.json to the dist directory
          { src: 'README.md', dest: 'build/' } // Copy README.md to the dist directory
        ]
      })
    ]
  }
];
