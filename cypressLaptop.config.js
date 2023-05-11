const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 919,
  viewportHeight: 1920,
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
