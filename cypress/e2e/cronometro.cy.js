describe('Login FocusTime', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  it('Deve fazer login com dados válidos e iniciar o cronômetro', () => {
    cy.visit('/userslogin/');

    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });

    cy.url().should('include', '/index/');
    cy.contains('Dashboard');

    
    cy.contains('a', 'Metas').click();
   
    cy.url().should('include', '/cronometro');

    cy.get('button#play').click();
    cy.wait(4000);

    
    cy.get('#segundos h3').invoke('text').then((text) => {
      const segundos = parseInt(text);
      expect(segundos).to.be.greaterThan(0);
    });
  });
});
