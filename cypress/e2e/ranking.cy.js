describe('Ranking de Usuários - FocusTime', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  it('Cenário 1: Deve exibir o ranking com os usuários com mais matérias cadastradas', () => {
    
    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });

    
    cy.url().should('include', '/index/');
    cy.contains('Dashboard');

    
    cy.contains('a', 'Ranking').click();

    
    cy.wait(2000);
    cy.get('.ranking-container').should('be.visible'); 
     

    cy.get('.ranking-list').should('have.length.greaterThan', 0); 
  });
});
