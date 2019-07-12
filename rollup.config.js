import typescript2 from 'rollup-plugin-typescript2';
import loadz0r from 'rollup-plugin-loadz0r';

export default {
  input: ['src/bootstrap.ts'],
  output: {
    format: 'amd',
    dir: 'dist'
  },
  plugins: [
    typescript2(),
    loadz0r()
  ]
}
