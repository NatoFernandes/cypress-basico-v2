Cypress._.times(5, function () {
    it('testa a página da política de privacidade de forma independente', function () {
        cy.visit('./src/privacy.html')
        cy.get('div > h1').should('have.text', 'CAC TAT - Política de privacidade')
    })
});