import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import fs from 'fs';
import path from 'path'

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const NAME = IS_PRODUCTION ? 'hello-week.min' : 'hello-week'
export default [
  {
    input: ['src/scripts/index.ts'],
    output: [
      {
        file: path.resolve(`dist/${NAME}.js`),
        format: 'es'
      },
      {
        file: path.resolve(`dist/${NAME}.cjs.js`),
        format: 'cjs'
      }
    ],
    plugins: [
      !IS_PRODUCTION && serve(),
      scss({
        output: 'dist/hello.week.css'
      }),
      typescript({}),
      resolve({
        mainFields: ['jsnext', 'main', 'browser']
      }),
      json(),
      commonjs(),
      IS_PRODUCTION && terser()
    ]
  },
  {
    input: fs.readdirSync('src/langs').map(e => 'src/langs/' + e),
    output: {
      dir: 'dist/langs/',
      format: 'es'
    },
    plugins: [
      typescript({}),
      resolve({
        mainFields: ['jsnext', 'main', 'browser']
      }),
      json(),
      commonjs(),
      terser()
    ]
  }
];
