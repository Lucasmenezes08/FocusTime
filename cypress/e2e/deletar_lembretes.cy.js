describe('Apagar um lembrete já cadastrado', () => {
  const tituloLembrete = 'Lembrete para apagar';

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);

    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click();

    
    cy.url().should('include', '/index/');
  });

  it('Deve criar e apagar um lembrete já cadastrado', () => {

    cy.visit('/lembretes/');
    cy.url().should('include', '/lembretes/');

    
    cy.get('#btn-d-day', { timeout: 10000 }).should('be.visible').click();

    
    cy.get('input[name="titulo"]').type(tituloLembrete);
    cy.get('input[name="data"]').type('2025-06-01');
    cy.get('input[name="hora"]').type('12:00');
    cy.get('textarea[name="descricao"]').type('Descrição para teste de apagar');

    cy.get('form#form-dia').submit();

    
    cy.contains('.lembrete-item', tituloLembrete).should('exist');

    
    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Tem certeza que deseja apagar este lembrete?');
      return true;
    });

    
    cy.contains('.lembrete-item', tituloLembrete)
      .within(() => {
        cy.get('button.btn-apagar').click({ force: true });
      });
;
  });
});
