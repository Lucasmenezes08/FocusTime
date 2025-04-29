// Comando customizado para login
Cypress.Commands.add('criarUser', () => {
  cy.visit('http://127.0.0.1:8000/userslogin/');
  cy.wait(1000);
  cy.get('a').click();
  cy.get('#usuario').type('Brenda Luana');
  cy.get('#senha').type('brenda22');
  cy.get('button').click();
});

describe('Login FocusTime', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    cy.criarUser();
  });

  it('login/cadastro', () => {
    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should('include', '/index/');
    cy.contains('Dashboard');
  });

  it('Cenário 1: Cadastrar uma matéria com sucesso', () => {
    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should('include', '/index/');
    cy.contains('Dashboard');
    cy.wait(2000);

    cy.contains('Adicionar materia').click({ force: true });
    cy.url().should('include', '/cadastro_materia/');
    cy.contains('insira').should('be.visible');

    
    cy.get('input[name="nome-materia"]').type('Interação Humano-Computador');
    cy.get('input[name="nome-meta"]').type('Estudar Cypress');
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
    
    cy.get('button[type="submit"]').click(); 
  });

  it('Cenário 2: Cadastrar matéria com tempo inválido (00:90:90)', () => {
    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should('include', '/index/');
    cy.contains('Dashboard');
    cy.wait(2000);

    cy.contains('Adicionar materia').click({ force: true });
    cy.url().should('include', '/cadastro_materia/');
    cy.contains('insira').should('be.visible');

    
    cy.get('input[name="nome-materia"]').type('Interação Humano-Computador');
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

    
    
cy.get('button[type="submit"]').click();


cy.get('.modal').should('be.visible'); 


cy.contains('.modal', 'O valor deve ser menor ou igual a 5').should('be.visible');

  });
});
