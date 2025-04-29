describe('Login FocusTime - Cadastro de Datas Importantes (Dia D)', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  it('Cenário 1: Cadastrar um evento X para o dia 25/04/2025', () => {

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
    //cy.contains('Data Prova Final').should('be.visible');
    //cy.contains('15/05/2025').should('be.visible');
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

    // Ex: cy.contains('Por favor, preencha a data').should('be.visible');
  });
});
