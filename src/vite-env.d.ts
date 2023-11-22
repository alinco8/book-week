/// <reference types="vite/client" />

interface ImportMetaEnv {
    SERVER_URL: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
