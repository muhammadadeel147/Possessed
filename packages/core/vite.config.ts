import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*'],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PossessedCore',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['axe-core', 'culori', 'diff', 'dom-accessibility-api'],
    },
  },
});
