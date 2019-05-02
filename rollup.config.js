/* globals process */

import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

const environment = process.env.ENV || 'development';
const isDevelopmentEnv = (environment === 'development');

module.exports = [
	{
		input: 'dist/main.js',
		output: {
			format: 'cjs',
			sourcemap: false,
			file: `deploy/${require('./package.json').name}-v${require('./package.json').version}.js`,
		},
		external: [ '@nestjs/common', 'config', 'moment', 'axios', 'node-schedule', 'qs'],
		plugins: [
      commonjs(),
			buble(),
			!isDevelopmentEnv && uglify({ output: { inline_script: true } }),
		],
	}
];
