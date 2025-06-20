import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';
import pluginSecurity from 'eslint-plugin-security';
import pluginSonar from 'eslint-plugin-sonarjs';


export default [
  // Globale Settings
  {
    files: ['src/**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        process: 'readonly'
      }
    }
  },

  // Für .js speziell CommonJS
  {
    files: ['src/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  },

  // Basis-Konfigurationen
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...pluginVue.configs['flat/recommended'],
  pluginSecurity.configs.recommended,
  pluginSonar.configs.recommended,

  // Vue-Spezifischer Parser + TS als Subparser
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
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  },

  // Eigene Regeln und Prettier
  {
    rules: {
      ...prettier.rules,
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
      'consistent-return': 'error',
      'prefer-const': 'error',
      'no-magic-numbers': ['warn', {ignore: [0, 1], ignoreArrayIndexes: true}],
      'vue/multi-word-component-names': 'warn',
      'vue/no-v-html': 'error',
    }
  }
];
