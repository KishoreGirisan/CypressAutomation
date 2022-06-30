
// Test03 - Complexity: Medium
// 1. Navigate to https://www.mathworks.com/videos/matlab-overview-61923.html
// 2. Verify that there are no broken links on the page without navigating to individual links.

/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Verify no broken link',function()
{
//test case
it('check No broken links',function()

{
    //cy.visit('https://www.mathworks.com/videos/matlab-overview-61923.html')
    cy.visit('https://www.mathworks.com/')
    
    cy.get('a').each($el=>{
        if($el.prop('href').length >0)
        {
            const mes = $el.text()
            expect($el,mes).to.have.attr('href').not.contains('undefined')
            cy.log($el.attr('href'))
        }

    }
    )
})
})