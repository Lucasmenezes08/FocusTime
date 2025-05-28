Cypress.Commands.add('criarUser', () => {
  cy.visit('http://127.0.0.1:8000/userslogin/');
  cy.wait(1000);
  cy.get('a').click();
  cy.get('#usuario').type('Brenda Luana');
  cy.get('#senha').type('brenda22');  
  cy.get('button').click();
});

Cypress.Commands.add('login', () => {
  cy.visit('/userslogin/');
  cy.get('input[name="username"]').type('Brenda Luana');
  cy.get('input[name="password"]').type('brenda22');
  cy.get('button[type="submit"]').click({ force: true });
  cy.url().should('include', '/index/');
  cy.contains('Dashboard').should('be.visible');
});

Cypress.Commands.add('preencherFormularioMeta', (materia, meta) => {
  cy.get('input[name="nome-materia"]').type(materia);
  cy.get('input[name="nome-meta"]').type(meta);
  cy.get('input[name="horas-meta"]').type('0');
  cy.get('input[name="horas-meta2"]').type('1');
  cy.get('input[name="minutos-meta"]').type('2');
  cy.get('input[name="minutos-meta2"]').type('3');
  cy.get('input[name="segundos-meta"]').type('4');
  cy.get('input[name="segundos-meta2"]').type('5');
  cy.get('input[name="horas"]').type('0');
  cy.get('input[name="horas2"]').type('2');
  cy.get('input[name="minutos"]').type('3');
  cy.get('input[name="minutos2"]').type('4');
  cy.get('input[name="segundos"]').type('5');
  cy.get('input[name="segundos2"]').type('6');
});

describe('Login FocusTime', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    cy.criarUser();
  });

  it('Deve fazer login com dados válidos', () => {
    cy.login();
  });

  it('Deve fazer login e cadastrar duas materias', () => {
    cy.login();

    
    cy.wait(2000);
    cy.contains('Adicionar matéria').click({ force: true });
    cy.url().should('include', '/cadastro_materia/');
    cy.contains('insira').should('be.visible');
    cy.preencherFormularioMeta('FDS', 'Estudar Cypress');
    cy.get('button[type="submit"]').click();

    
    cy.contains('Adicionar matéria').click({ force: true });
    cy.url().should('include', '/cadastro_materia/');
    cy.contains('insira').should('be.visible');
    cy.get('input[name="nome-materia"]').type('FDS');
    cy.get('input[name="nome-meta"]').type('Estudar Cypress');
    cy.get('input[name="horas-meta"]').type('0');
    cy.get('input[name="horas-meta2"]').type('0');
    cy.get('input[name="minutos-meta"]').type('9');
    cy.get('input[name="minutos-meta2"]').type('0');
    cy.get('input[name="segundos-meta"]').type('9');
    cy.get('input[name="segundos-meta2"]').type('0');
    cy.get('input[name="horas"]').type('0');
    cy.get('input[name="horas2"]').type('0');
    cy.get('input[name="minutos"]').type('9');
    cy.get('input[name="minutos2"]').type('0');
    cy.get('input[name="segundos"]').type('9');
    cy.get('input[name="segundos2"]').type('0');
    cy.get('button[type="submit"]').click();
  });
});
