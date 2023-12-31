import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import autoPrefixer from 'autoprefixer';

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, './') };
    return {
        plugins: [react(), tsconfigPaths(), eslint()],
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
