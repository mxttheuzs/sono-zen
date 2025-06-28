import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildForNetlify() {
  try {
    await build({
      root: resolve(__dirname, 'client'),
      build: {
        outDir: resolve(__dirname, 'dist-netlify'),
        emptyOutDir: true,
        rollupOptions: {
          external: []
        }
      },
      base: './'
    });
    console.log('Build completed successfully for Netlify!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildForNetlify();