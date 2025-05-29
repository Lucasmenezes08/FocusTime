describe('Criar matéria e editar meta cadastrada', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);

    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should('include', '/index/');
    cy.contains('Metas').should('be.visible');
  });

  it('Deve criar uma matéria e editar a meta cadastrada', () => {
    const materiaNome = 'PIF';
    const metaNome = 'Jogo';
    const novoNomeMeta = 'Lista';
    const novoHorasMeta = '33';
    const novoMinutosMeta = '33';
    const novoSegundosMeta = '33';

    
    cy.contains('Adicionar matéria').click({ force: true });
    cy.url().should('include', '/cadastro_materia/');
    cy.contains('insira').should('be.visible');

    cy.get('input[name="nome-materia"]').type(materiaNome);
    cy.get('input[name="nome-meta"]').type(metaNome);

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

    cy.visit('/index/');
    cy.url().should('include', '/index/');
    cy.contains(materiaNome).should('exist');

   cy.contains('Metas').should('be.visible').click();

   cy.url().should('include', '/cronometro/');

    
    cy.get('.metas-container').contains('.meta-nome p', metaNome)
      .parents('.metas-container')
      .within(() => {
        cy.get('.btn-editar').click({ force: true });
      });

    cy.url().should('include', '/meta/editar/');

    
    cy.get('input[name="nome-meta"]').clear().type(novoNomeMeta);
    cy.get('input[name="horas-meta"]').clear().type(novoHorasMeta);
    cy.get('input[name="minutos-meta"]').clear().type(novoMinutosMeta);
    cy.get('input[name="segundos-meta"]').clear().type(novoSegundosMeta);

    
    cy.get('form').submit();

    
    cy.url().should('include', '/cronometro/');
    cy.contains(novoNomeMeta).should('exist');
   
  });
});
