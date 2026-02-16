import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text", "json", "json-summary"],
      reportOnFailure: true,
    },
    include: ["src/**/specs/*.spec.ts"],
    env: {
      NODE_ENV: "test",
    },
    maxWorkers: 1,
    setupFiles: ["./src/tests/setup.ts"],
  },
});
