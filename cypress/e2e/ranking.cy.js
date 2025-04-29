describe('Login FocusTime', () => {
    beforeEach(() => {
      Cypress.on('uncaught:exception', () => false);
    });
    it('Deve fazer login com dados válidos', () => {
      cy.visit('/userslogin/');
  
      cy.get('input[name="username"]').type('Brenda Luana');
      cy.get('input[name="password"]').type('brenda22');
      cy.get('button[type="submit"]').click({ force: true });
      cy.url().should('include', '/index/');
      cy.contains('Dashboard');
      cy.contains('a', 'Ranking').click();
      cy.wait(2000);
    });
})