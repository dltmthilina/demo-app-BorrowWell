import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/support/e2e/**/*.cy.{js,ts,jsx,tsx}", // Ensure correct test file location and extensions
    supportFile: "cypress/support/e2e/test.cy.ts",
  },
});
