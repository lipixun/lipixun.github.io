import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const buildTime = Date.now();

// https://vite.dev/config/
export default defineConfig({
  define: {
    __BUILD_TIME__: buildTime,
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    {
      name: 'write-build-time',
      writeBundle: options => {
        fs.writeFileSync(path.join(options.dir ?? './', 'build-time.json'), JSON.stringify({ time: buildTime }));
      },
    },
  ],
});
