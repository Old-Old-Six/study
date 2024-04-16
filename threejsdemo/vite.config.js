import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const config = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, "src")
      }
    },
    build: {
      outDir: "dist"
    },
    base: "./",
    server: {
      https: false,
      port: 8888
    },
  }
  
  return config
})
