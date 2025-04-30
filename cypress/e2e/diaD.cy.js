describe('Login FocusTime - Cadastro de Datas Importantes (Dia D)', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  it('Cenário 1: Cadastrar uma data importante', () => {

    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should('include', '/index/');
    cy.contains('Dashboard');


    cy.contains('a', 'Dia-D').click();

  
    cy.get('#btn-d-day').click();

    cy.get('input[name="nome-day"]').type('Data Prova Final');
    cy.get('#data-day').should('be.visible').type('2025-04-25');
    cy.get('button.btn-d-submit').click();

    cy.wait(2000);
   
  });

  it('Cenário 2 (negativo): Cadastrar um evento X sem inserir uma data específica', () => {
  
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
});
