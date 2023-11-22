import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoPrefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), viteSingleFile()],
    server: {
        cors: false,
    },
    css: {
        postcss: {
            plugins: [autoPrefixer],
        },
    },
});
