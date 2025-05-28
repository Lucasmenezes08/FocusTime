describe('Apagar uma matéria já cadastrada', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);

    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should('include', '/index/');
    cy.contains('Dashboard').should('be.visible');
  });

  it('Deve apagar uma matéria já cadastrada', () => {
    const materiaNome = 'FDS';

   
    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Tem certeza que deseja apagar esta matéria?');
      return true;
    });

    cy.contains('.container_materia h2', materiaNome)
      .parents('.materia-wrapper')
      .within(() => {
        cy.get('button.btn-consultar-materia').click({ force: true });
      });

  
    cy.get('.modal-content').filter(':visible').first().within(() => {
    cy.get('button').contains('Apagar').click({ force: true });
    });

    
    cy.url().should('include', '/index/');

  
    cy.visit('/index/');
  });
});
