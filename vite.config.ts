import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/huyentrang.github.io/', // thay 'your-repo-name' bằng tên repo GitHub của bạn
  plugins: [react()],
})
