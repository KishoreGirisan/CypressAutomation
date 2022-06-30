/// <reference types="Cypress" />

describe('My first test suite',function()
{
//test case
it('My first test case',function()

{
//test step
//launch url
cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
//type ca in search bar
cy.get('.search-keyword').type('ca')
//wait
cy.wait(2000)
//get no of items searched by ca name
//cy.get('.product:visible').should('have.length',4)
//parent child chaining
//-- we can use aliasing to resue locatiors
cy.get('.products').as('productlocators')
cy.get('@productlocators').find('.product').should('have.length',4)
//select element - capsicum (hard coded)
cy.get('@productlocators').find('.product').eq(2).contains('ADD TO CART').click()

//Select element - cashew dyanmicaly
cy.get('@productlocators').find('.product').each(($el, index, $list) => {

    const vegname = $el.find('h4.product-name').text()
    if(vegname.includes('Cashews'))
    {
        cy.wrap($el).find('button').click()
    }

})

//assertion of logoname
cy.get('.brand.greenLogo').should('have.text','GREENKART')

//resolving promises for non-cypress commands (like text())
//cy.get('.brand.greenLogo').text() --- this will fail
//then() is used to resolve promises manually
cy.get('.brand.greenLogo').then(function(logoname){
    cy.log(logoname.text())
})

})

})