import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import fs from 'fs';

const production = process.env.NODE_ENV === 'production';

export default [{
	input: ['src/scripts/index.ts'],
	output: {
		file: production ? 'dist/hello-week.min.js' : 'dist/hello-week.js',
		name: 'hello-week',
		format: 'es'
	},
	plugins: [
		!production && serve(),
		scss({
			output: 'dist/hello.week.css'
		}),
		typescript({}),
		resolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		json(),
		commonjs(),
		production && terser()
	]
}, {
  input: fs.readdirSync('src/langs').map(e => 'src/langs/' + e),
  output: {
    dir: 'dist/langs/',
    format: 'es'
  }
}];
