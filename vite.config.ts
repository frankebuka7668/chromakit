import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {cp, mkdir} from 'node:fs/promises';
import path from 'path';
import {defineConfig} from 'vite';

function copyMappedMediaAssets() {
  return {
    name: 'copy-mapped-media-assets',
    apply: 'build' as const,
    async closeBundle() {
      const source = path.resolve(__dirname, 'public/assets/aistudio');
      const destination = path.resolve(__dirname, 'dist/assets/aistudio');
      await mkdir(path.dirname(destination), {recursive: true});
      await cp(source, destination, {recursive: true});
    },
  };
}

export default defineConfig(() => {
  return {
    // Keep the five showcase HTML files at root-level routes.
    publicDir: 'public/pages',
    preview: {
      // Arena assigns a new preview hostname per session; allow only its domain suffix.
      allowedHosts: ['.e2b.app'],
    },
    plugins: [react(), tailwindcss(), copyMappedMediaAssets()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
