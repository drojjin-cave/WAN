// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import tailwindcss from '@tailwindcss/vite';
//
// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/css/app.css', 'resources/js/app.js'],
//             refresh: true,
//         }),
//         tailwindcss(),
//     ],
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],

    build: {
        manifest: true,
        outDir: 'public/build',
        emptyOutDir: true,
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'frontend/src'),
        },
    },

    define: {
        'process.env': {}
    }
})
