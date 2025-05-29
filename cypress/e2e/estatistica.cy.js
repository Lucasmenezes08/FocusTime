describe('Visualizar página de Estatísticas', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  it('Deve fazer login e acessar a página de Estatísticas', () => {
    cy.visit('/userslogin/');

   
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });

   
    cy.url().should('include', '/index/');
    cy.contains('Dashboard');
    cy.contains('a', 'Estatisticas').click();

    
    cy.url().should('include', '/estatisticas');

    
    cy.get('canvas#myChart').should('be.visible');
  });
});
