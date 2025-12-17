// cypress/e2e/api/checkout.cy.js

describe('API - Carrinho e Checkout', () => {
it('Deve adicionar um produto ao carrinho (POST) e validar regra de negócio', () => {

  const payload = {
    productId: 1,
    quantity: 2,
  }

  cy.postApi('carrinho', payload).then((response) => {
    // valida status e body de resposta
    expect(response.status).to.eq(201)
    expect(response.body).to.have.property('id')
    expect(response.body).to.have.property('message')
    expect(response.body.message).to.include('Produto adicionado ao carrinho')

    // >>> validação do requestBody <<<
    const rawBody = response.requestBody          // string JSON
    const reqBody = JSON.parse(rawBody)           // objeto { productId, quantity }

    expect(reqBody.productId).to.eq(payload.productId)
    expect(reqBody.quantity).to.eq(payload.quantity)
  })
})



  it('Deve finalizar checkout simples com todos os campos obrigatórios preenchidos', () => {

    const checkoutBody = {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      number: '456',
      cep: '12345678',
      phone: '1234567890',
      email: 'john.doe@example.com',
      paymentMethod: 'credit_card',
      cardNumber: '1234123412341234',
      cardExpiry: '12/2025',
      cardCvc: '123',
      boletoCode: '23793.38128 60082.677139 66003.996498 1 89440000010000',
      pixKey: '123e4567-e89b-12d3-a456-426614174000',
      createAccount: false,
      password: 'Password123!',
    }

    cy.postApi('checkout', checkoutBody).then((response) => {
      expect(response.status).to.eq(201)                // ajuste se sua API usar outro código
      expect(response).to.have.property('statusText')

      const statusText = String(response.statusText)
      expect(statusText).to.include('Created')          // "Created" para 201

      expect(response.body).to.have.property('orderNumber')
      // se a API devolver status do pedido, pode validar aqui:
      // expect(response.body.order.status).to.eq('paid')
    })
  })

  it('Não deve permitir checkout sem campos obrigatórios', () => {

    const invalidBody = {
      // por exemplo, omitindo paymentMethod ou address
      name: 'Usuário Teste',
      email: 'teste@qa.com',
    }

    cy.request({
      method: 'POST',
      url: '/api/checkout',
      body: invalidBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400) // ou 422, conforme documentação

      const bodyText = String(response.body) // força para string
      expect(bodyText).to.include('required') // ex: '"firstName" is required'
    })
  })
})
