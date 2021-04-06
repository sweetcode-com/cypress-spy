describe('Google gtag events', () => {

    // Cypress.on('window:before:load', (win) => {
    //     // because this is called before any scripts
    //     // have loaded - the ga function is undefined
    //     // so we need to create it.
    //     win.gtag = cy.spy().as('gtag')
    // })

    Cypress.on('window:before:load', (win) => {
        // because this is called before any scripts
        // have loaded - the ga function is undefined
        // so we need to create it.
        win.gtag = cy.stub().as('gtag')
        // cy.spy(win, 'gtag-stub').as('gtag')
    
    
    })

    // https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__google-analytics/cypress/integration/ga-method-stubbing.js
    // https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/spy-on-fetch-spec.js


    it('visit product page', () => {

        cy.visit('/index.html')
            .contains('gtag test')
            .should('exist')

    })
})
