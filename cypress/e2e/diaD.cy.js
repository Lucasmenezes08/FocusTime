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
      cy.contains('a', 'Dia-D').click();
      cy.get('#btn-d-day').click(); 
      cy.get('input[name="nome-day"]').type('Data Prova Final');
      cy.get('#data-day').should('be.visible').type('2025-05-15');
      cy.get('button.btn-d-submit').click();
      cy.wait(2000);
    });
    it('Cenario negativo', () => {
        cy.visit('/userslogin/');
  
      cy.get('input[name="username"]').type('Brenda Luana');
      cy.get('input[name="password"]').type('brenda22');
      cy.get('button[type="submit"]').click({ force: true });
      cy.url().should('include', '/index/');
      cy.contains('Dashboard');
      cy.contains('a', 'Dia-D').click();
      cy.get('#btn-d-day').click(); 
      cy.get('input[name="nome-day"]').type('Data Prova Final');
      
      cy.get('button.btn-d-submit').click();
      });

})