describe('Google gtag events', () => {

    // Cypress.on('window:before:load', (win) => {
    //     // because this is called before any scripts
    //     // have loaded - the ga function is undefined
    //     // so we need to create it.
    //     win.gtag = cy.spy().as('gtag')
    // })

    // Cypress.on('window:before:load', (win) => {
    //     // because this is called before any scripts
    //     // have loaded - the ga function is undefined
    //     // so we need to create it.
    //     win.gtag = cy.stub().as('gtag-stub')
    //     // cy.spy(win, '@gtag-stub').as('gtag')
    //     // cy.spy(win, 'gtag').as('gtag')
    // })

    it('visit index page 1', () => {

        cy.visit('/index.html')
            .contains('gtag test')
            .should('exist')
    })

    it('visit index page 2', () => {
        cy.visit('/index.html', {
            onBeforeLoad(win) {
                cy.spy(win, 'gtag').as('gtag')
            },
        })

        cy.get('@gtag').should('be.called')
        cy.get('@gtag').should('be.called', 'event', 'view_item')
    })

    it('visit index page 3', () => {
        cy.visit('/index.html')
        cy.window().its('gtag')
        cy.window().then((win) => {
            cy.spy(win, 'gtag').as('gtag');
        })

        cy.get('@gtag').should('be.called')
        cy.get('@gtag').should('be.called', 'event', 'view_item')
    })

    it('visit index page 4', () => {

        const gtag = cy.stub().as('gtag')
        cy.on('window:before:load', (win) => {
            Object.defineProperty(win, 'gtag', {
                // configurable: false,
                get: () => gtag,
                set: () => { },
            })
            cy.visit('/index.html')
        })
        
        cy.get('@gtag').should('be.called')
        cy.get('@gtag').should('be.called', 'event', 'view_item')
    })
})
