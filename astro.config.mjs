import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://denden.example',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
});
