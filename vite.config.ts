/// <reference types="vitest" />

import { defineConfig } from 'vite';

export default defineConfig({ 

  test : {

    globals: true,
    include: ["src/ts/**/*.spec.ts"],

    coverage: {
      exclude: ["build/**/*", "docs/**/*"]
    }

  }

});
