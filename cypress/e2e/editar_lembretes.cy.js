describe('Editar lembrete', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);

    cy.visit('/userslogin/');
    cy.get('input[name="username"]').type('Brenda Luana');
    cy.get('input[name="password"]').type('brenda22');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/index/');
  });

  it('Cenario 1: Deve criar e depois editar um lembrete existente', () => {
    const tituloOriginal = 'Lembrete Teste';
    const dataOriginal = '2025-05-30';
    const horaOriginal = '12:00';
    const descricaoOriginal = 'Descrição teste';

    const novoTitulo = 'Lembrete Editado';
    const novaData = '2025-06-01';
    const novaHora = '14:30';
    const novaDescricao = 'Descrição editada via Cypress';

    
    cy.visit('/lembretes/');
    cy.url().should('include', '/lembretes/');

    
    cy.get('#btn-d-day').click();

    
    cy.get('input[name="titulo"]').type(tituloOriginal);
    cy.get('input[name="data"]').type(dataOriginal);
    cy.get('input[name="hora"]').type(horaOriginal);
    cy.get('textarea[name="descricao"]').type(descricaoOriginal);

    
    cy.get('form#form-dia').submit();

    
    cy.contains('.lembrete-item', tituloOriginal).should('exist');

    
    cy.contains('.lembrete-item', tituloOriginal)
      .within(() => {
        cy.get('a.btn-editar').click();
      });

    
    cy.url().should('include', '/lembrete/editar/');


    cy.get('input[name="titulo"]').clear().type(novoTitulo);
    cy.get('input[name="data"]').clear().type(novaData);
    cy.get('input[name="hora"]').clear().type(novaHora);
    cy.get('textarea[name="descricao"]').clear().type(novaDescricao);

    
    cy.get('form').submit();

    
    cy.url().should('include', '/lembretes/');


    cy.contains('.lembrete-item', novoTitulo).should('exist');
   
  });
});
