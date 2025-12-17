// cypress/support/commands.js

// Exemplo de GET genérico
Cypress.Commands.add("getApi", (endpoint, options = {}) => {
  return cy.request({
    method: 'GET',
    url: `/api/${endpoint}`,
    ...options,
  })
})

// Exemplo de POST genérico
Cypress.Commands.add("postApi", (endpoint, body, options = {}) => {
  return cy.request({
    method: 'POST',
    failOnStatusCode: false,
    url: `/api/${endpoint}`,
    body,
    ...options,
  })
})
