export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    Pages(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router']
        }
      }
    }
  }
});
