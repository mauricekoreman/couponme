import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa";

// https://css-tricks.com/vitepwa-plugin-offline-service-worker/

const getCache = ({ name, pattern }: { name: string; pattern: RegExp }) => ({
  urlPattern: pattern,
  handler: "CacheFirst" as const,
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24, // 1 day
    },
    cacheableResponse: {
      statuses: [200],
    },
  },
});

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      strategies: "generateSW",
      workbox: {
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          getCache({
            name: "storage-cache",
            pattern: /^https:\/\/firebasestorage.googleapis.com\/v0\/b\/couponet.c8c94.appspot.com/,
          }),
        ],
      },
      manifest: {
        name: "CouponMe",
        short_name: "CouponMe",
        description: "Coupon sharing app for couples",
        theme_color: "#FFFFF4",
        background_color: "#FFFFF4",
        icons: [
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: [
      "firebase",
      "firebase/app",
      "firebase/auth",
      "firebase/firestore",
      "firebase/analytics",
      "firebase/storage",
    ],
  },
});
































