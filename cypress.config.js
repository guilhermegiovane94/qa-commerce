const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',  // Padrão: arquivos .cy.js

    setupNodeEvents(on, config) {
      // implement node event listeners here
      const urls = {
        local: 'http://localhost:3000',
      }

      config.baseUrl = urls.local
      return config

    },
  },
});
