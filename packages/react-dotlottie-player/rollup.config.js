import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

const production = !process.env.ROLLUP_WATCH;

const onwarn = (warning, warn) => {
  if (warning.code === 'EVAL') return;
  // The `"use client"` directive is re-added via `output.banner` below because
  // Rollup ignores module-level directives when bundling.
  if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
  warn(warning);
};

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/react-dotlottie-player.esm.js',
      format: 'esm',
      sourcemap: true,
      banner: '"use client";',
    },
    onwarn,
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        outputToFilesystem: true,
      }),
      production && terser({ compress: { directives: false } }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/react-dotlottie-player.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      banner: '"use client";',
    },
    onwarn,
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        outputToFilesystem: true,
      }),
      production && terser({ compress: { directives: false } }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/react-dotlottie-player.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
