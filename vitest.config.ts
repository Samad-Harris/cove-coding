import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    include: ['**/*.test.ts'],
    exclude: [
      '**/*.api.test.ts', 
      '**/*.test.tsx', 
      '**/*.spec.ts', 
      'tests/e2e/**/*',
      'node_modules/**'
    ],
  },
});
