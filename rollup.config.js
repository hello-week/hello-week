const typescript = require('rollup-plugin-typescript2');
const scss = require('rollup-plugin-scss');
const filesize = require('rollup-plugin-filesize');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const serve = require('rollup-plugin-serve');
const copy = require('rollup-plugin-copy');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

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

module.exports = [
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
                targets: [{ src: 'dist/langs', dest: 'docs/v2/demos/scripts' }],
                targets: [
                    {
                        src: 'dist/hello.week.esm.js',
                        dest: 'docs/v2/demos/scripts',
                    },
                ],
            }),
        ],
    },
];
