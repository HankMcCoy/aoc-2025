import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      util: resolve(__dirname, 'util'),
      src: resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
  },
});
