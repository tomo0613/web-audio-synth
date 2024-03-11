import vite_react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import vite_tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    base: '/web-audio-synth',
    server: {
        open: true,
    },
    plugins: [
        vite_react(),
        vite_tsconfigPaths(),
    ],
    esbuild: {
        jsxInject: 'import React from "react"',
    },
});
