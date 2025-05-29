describe('Apagar uma meta já cadastrada', () => {
  it('Deve apagar uma meta já cadastrada', () => {
    const metaNome = 'Estudar Cypress';

    Cypress.on('uncaught:exception', () => false);

    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should('include', '/index/');
    cy.contains('Metas').should('be.visible').click({ force: true });
    cy.url().should('include', '/cronometro/');

    cy.visit('/cronometro/');
    cy.url().should('include', '/cronometro/');


    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Tem certeza que deseja apagar esta meta?');
      return true;
    });


    cy.get('.metas-container').contains('.meta-nome p', metaNome)
      .parents('.metas-container')
      .within(() => {
        cy.get('.btn-apagar').click({ force: true });
      });

    cy.url().should('include', '/cronometro/');
  });
});
