
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
  
    it('Deve fazer login com dados válidos', () => {
      cy.visit('/userslogin/');
      cy.get('input[name="username"]').type('Brenda Luana');
      cy.get('input[name="password"]').type('brenda22');
      cy.get('button[type="submit"]').click({ force: true });
      cy.url().should('include', '/index/');
      cy.contains('Dashboard');
    });
  
    
    it('Cenário 1: Visualizar metas cadastradas', () => {

      cy.visit('/userslogin/');
      cy.get('input[name="username"]').type('Brenda Luana');
      cy.get('input[name="password"]').type('brenda22');
      cy.get('button[type="submit"]').click({ force: true });
      cy.url().should('include', '/index/');
      cy.contains('Dashboard');
  
      cy.contains('a', 'Metas').click();
  
      cy.url().should('include', '/cronometro/'); 
      
    });
  
    
    it('Cenário 2: Definir metas sem cadastrar matéria', () => {
     
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
  
      
      cy.get('input[name="nome-meta"]').type('Estudar Cypress');
      cy.get('input[name="horas-meta"]').type('1');
      cy.get('input[name="minutos-meta"]').type('30');
  
     
      cy.get('button[type="submit"]').click();
      
    });
  });
  