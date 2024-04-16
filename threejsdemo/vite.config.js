import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const config = {
    plugins: [vue()],
  
    server: {
      https: false,
      port: 8888
    },
  }
  
  return config
})
