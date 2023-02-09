import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const NAME = IS_PRODUCTION ? 'hello.week.min' : 'hello.week';

const entryFile = 'src/index.ts';
const outputConfigs = [
    {
        file: path.resolve(`dist/${NAME}.cjs.js`),
        format: 'cjs',
    },
    {
        file: path.resolve(`dist/${NAME}.js`),
        format: 'iife',
    },
    {
        file: path.resolve(`dist/${NAME}.esm.js`),
        format: 'esm',
    },
];

rimraf.sync('types');

export default [
    {
        input: entryFile,
        output: outputConfigs,
        plugins: [
            !IS_PRODUCTION && serve(),
            scss({
                output: 'dist/hello.week.css',
            }),
            typescript({
                useTsconfigDeclarationDir: true,
            }),
            resolve({
                mainFields: ['jsnext', 'main', 'browser'],
            }),
            IS_PRODUCTION && filesize(),
            commonjs(),
            IS_PRODUCTION && terser(),
        ],
    },
    {
        input: fs.readdirSync('src/langs').map((e) => 'src/langs/' + e),
        output: {
            dir: 'dist/langs/',
            format: 'es',
        },
        plugins: [
            typescript({
                useTsconfigDeclarationDir: true,
            }),
            resolve({
                mainFields: ['jsnext', 'main', 'browser'],
            }),
            IS_PRODUCTION && filesize(),
            commonjs(),
            terser(),
            copy({
                targets: [{ src: 'dist', dest: 'docs/v2/demos/scripts' }],
            }),
        ],
    },
];
