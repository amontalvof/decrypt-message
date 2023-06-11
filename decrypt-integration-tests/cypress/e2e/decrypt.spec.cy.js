describe('decrypt spec', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/');
    });

    it('should render Home page', () => {
        cy.get('h1').should('have.text', 'Tech challenge for Fullstack Devs');
        cy.get('h2').should('have.text', 'by Andy Montalvo Fernandez');
    });

    it('should render decrypted message', () => {
        cy.intercept('POST', 'http://localhost:8080/api/decrypt', {
            statusCode: 200,
            body: {
                ok: true,
                message: { first_name: 'John', last_name: 'Doe', id: '123' },
            },
        }).as('mockedAPI1');
        cy.get('input').type('John000Doe000123');
        cy.get('button').click();
        cy.wait('@mockedAPI1');
        cy.get('pre').should(
            'have.text',
            '{\n    "first_name": "John",\n    "last_name": "Doe",\n    "id": "123"\n}'
        );
    });

    it('should render error message', () => {
        cy.intercept('POST', 'http://localhost:8080/api/decrypt', {
            statusCode: 400,
            body: {
                ok: false,
                errors: { message: { msg: 'The message is not valid.' } },
            },
        }).as('mockedAPI2');
        cy.get('input').type('John000Doe');
        cy.get('button').click();
        cy.wait('@mockedAPI2');
        cy.get('p').should('have.text', 'The message is not valid.');
    });
});
