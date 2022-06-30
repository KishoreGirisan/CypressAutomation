/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('UI Navigation and Validation',function()
{

it('UI Navigation and Validation',function()

{
    //1.Navigate to https://www.mathworks.com/pricing-licensing.html?prodcode=ML
    cy.visit('https://www.mathworks.com/pricing-licensing.html?prodcode=ML')

    //2.Verify the MATLAB text on the right box has the url attached to it as
    //‘https://www.mathworks.com/products/matlab.html’
    cy.get('a.product_name').should("have.attr","href").and("include","https://www.mathworks.com/products/matlab.html")

    //3. Verify the price ‘USD 2,200’ for perpetual license
    cy.get('.col-sm-5.standard-tab > .add_margin_40_xs > .panel > .panel-body > :nth-child(1) > .price_show > :nth-child(1) > label > .h3 > .price').then(($ele)=>{
      const priceval = $ele.text()
      cy.log(priceval)
      cy.log(priceval=='USD 2,200')
      expect(priceval).to.equal('USD 2,200')

  })
    //4. Verify the price ‘USD 800’ for annual license
    cy.get('.col-sm-5.standard-tab > .add_margin_40_xs > .panel > .panel-body > :nth-child(1) > .price_show > :nth-child(2) > label > .h3 > .price-annual').then(($ele)=>{
      const Alval = $ele.text()
      cy.log(Alval)
      cy.log(Alval=='USD 880')
      expect(Alval).to.equal('USD 880')

  })

    //5. Verify the Buy now button has the link attached to it as
    //‘https://www.mathworks.com/store/link/products/standard/ML’
   
   // cy.get('.col-sm-5.standard-tab > .add_margin_40_xs > .panel > .panel-body > .buy_now_button > .annual-buy-now').click()
   cy.get('.col-sm-5.standard-tab > .add_margin_40_xs > .panel > .panel-body > .buy_now_button > .buy-now').click()
    cy.url().should('eq','https://www.mathworks.com/store/link/products/standard/ML')
    
})
})
