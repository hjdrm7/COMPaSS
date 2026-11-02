import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: { name: 'COMPaSS', short_name: 'COMPaSS', start_url: '/resident', display: 'standalone', background_color: '#f8fafc', theme_color: '#082f49', icons: [{ src: '/compass.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] },
    workbox: { navigateFallbackDenylist: [/^\/toc/, /^\/login-for-toc/] }
  })]
})
