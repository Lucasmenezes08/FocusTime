describe('Editar uma matéria já cadastrada', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);

    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should('include', '/index/');
    cy.contains('Dashboard').should('be.visible');
  });

  it('Deve criar uma matéria e editar a matéria cadastrada', () => {
    const materiaNomeOriginal = 'PIF';
    const nomeMeta = 'Estudar Cypress';
    const novoNomeMateria = 'PIF';
    const novoHoras = '01';
    const novoMinutos = '30';
    const novoSegundos = '15';

    
    cy.contains('Adicionar matéria').click({ force: true });
    cy.url().should('include', '/cadastro_materia/');
    cy.contains('insira').should('be.visible');

    cy.get('input[name="nome-materia"]').type(materiaNomeOriginal);
    cy.get('input[name="nome-meta"]').type(nomeMeta);
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
  
    cy.url().should('include', '/index/');
    cy.contains(materiaNomeOriginal).should('exist');

    
    cy.contains('.container_materia h2', materiaNomeOriginal)
      .parents('.materia-wrapper')
      .within(() => {
        cy.get('button.btn-consultar-materia').click({ force: true });
      });

  
    cy.get('.modal-content').filter(':visible').first().within(() => {
      cy.get('button').contains('Editar').click({ force: true });
    });


    cy.url().should('include', '/materia/editar/');

    cy.get('input[name="nome-materia"]').clear().type(novoNomeMateria);
    cy.get('input[name="horas"]').clear().type(novoHoras);
    cy.get('input[name="minutos"]').clear().type(novoMinutos);
    cy.get('input[name="segundos"]').clear().type(novoSegundos);

    cy.get('form').submit();

    cy.url().should('include', '/index/');
    cy.contains(novoNomeMateria).should('exist');
    cy.contains(`${novoHoras}:${novoMinutos}:${novoSegundos}`).should('exist');
  });
});
