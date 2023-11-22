import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoPrefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, './') };
    return {
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
    };
});
