
// cypress/e2e/api/products.cy.js

describe('API - Produtos', () => {
  it('Deve retornar lista de produtos com status 200', () => {
    cy.getApi('produtos').then((response) => {
      console.log(expect(response.body.products).to.have.length.greaterThan(0))
      expect(response.status).to.eq(200)
      expect(response.body.products).to.be.an('array')
      expect(response.body.products).to.have.length.greaterThan(0)


      // Regra de negócio de exemplo:
      // cada produto deve ter id, name e price
      const products = response.body.products   // <<< array de objetos

      products.forEach((product) => {
        expect(product).to.have.property('id')
        expect(product).to.have.property('name')
        expect(product).to.have.property('price')
        expect(product.price).to.be.greaterThan(0)
      })
    })
  })

  it('Deve retornar um produto específico por ID', () => {
    const productId = 1 // ajustar conforme regra da API
    cy.getApi(`produtos/${productId}`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', productId)
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('price')
    })
  })
})
