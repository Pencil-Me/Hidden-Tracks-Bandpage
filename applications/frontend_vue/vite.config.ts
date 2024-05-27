import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'

import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy'

import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    return {
        plugins: [
            vue(),
            createHtmlPlugin({
                minify: true,
                template: 'public/index.html',
                inject: {
                    data: {
                        VITE_TRACKER_URL: process.env.VITE_TRACKER_URL,
                        VITE_SITE_ID: process.env.VITE_SITE_ID,
                    },
                },
            }),
            viteStaticCopy({
                targets: [
                    {
                        src: 'src/assets/imgs',
                        dest: ''
                    }
                ]
            }),
            Components({
                resolvers: [BootstrapVueNextResolver()],
            }),
        ],
        resolve:
            {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url))
                }
            }
    }
})
