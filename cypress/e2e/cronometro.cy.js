describe('Login FocusTime', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  it('Cenário 1: Iniciar o cronômetro para a realização de uma atividade', () => {
    
    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });

   
    cy.url().should('include', '/index/');
    cy.contains('Dashboard');
    cy.contains('a', 'Metas').click();

    
    cy.get('img[alt="Play"]').dblclick();
    cy.get('#check').check();
    cy.get('#btn-modal-submit').click();

    
    cy.get('img[src="/static/img/icon_play.png"]').click();

    cy.wait(2000); 
  });
});

