describe('Lembretes - FocusTime', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  

  it('Cenário 1: Deve cadastrar um lembrete de estudo com todos os campos preenchidos', () => {
    
    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });

    
    cy.url().should('include', '/index/');
    cy.contains('Dashboard');
    cy.contains('Lembretes').click({ force: true });

    
    cy.get('#btn-d-day').should('be.visible').click();
    cy.get('#titulo').type('Lembrar de revisar IHC');
    cy.get('#descricao').type('Estudar os comandos básicos do Cypress para a prova.');
    cy.get('#hora').should('be.visible').type('14:30');
    cy.get('#data').type('2025-05-20');

    
    cy.get('button.btn-d-submit').click();
    cy.wait(2000);

  });


  it('Cenário 2 (negativo): Não deve cadastrar lembrete com campos incompletos', () => {

    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });

  
    cy.url().should('include', '/index/');
    cy.contains('Dashboard');
    cy.contains('Lembretes').click({ force: true });

    
    cy.get('#btn-d-day').should('be.visible').click();
    cy.get('#titulo').type('Lembrar de revisar IHC');
    cy.get('#hora').should('be.visible').type('14:30');
    cy.get('#data').clear(); 

    cy.get('button.btn-d-submit').click();
    
   
  });
});
