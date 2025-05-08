import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';

export default [
  {
    files: ['src/**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        process: 'readonly'
      }
    }
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        extraFileExtensions: ['.vue']
      }
    }
  },
  {
    rules: {
      ...prettier.rules,
      // 'no-console': ['warn', {allow: ['warn', 'error']}],
      // 'no-debugger': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
      'consistent-return': 'error',
      'prefer-const': 'error',
      'no-magic-numbers': ['warn', {ignore: [0, 1]}]
    }
  }
];
