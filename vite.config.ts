import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoPrefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        cors: false,
    },
    base: '/book-week/',
    css: {
        postcss: {
            plugins: [autoPrefixer],
        },
    },
});
