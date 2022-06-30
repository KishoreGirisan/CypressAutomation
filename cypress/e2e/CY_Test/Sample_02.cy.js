// Validation of UI vs XHR response using cy.request (calling API directly)

/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  describe('Verify XHR',function()
{

beforeEach(()=>{
    cy.visit('https://www.mathworks.com/pricing-licensing.html?prodcode=ML')
})
    //test case to validate XHR ntw calls
it('XHR validation',function()

{
 //call the API directly
   cy.request('GET','https://www.mathworks.com/content/mathworks/www/en/pricing-licensing/jcr:content.product.json?baseCode=ML').then(function(response){
       expect(response.status).to.eq(200)
       //expect(response.body).to.have.property('commercial')
       const comprice = response.body.commercial['price']
       cy.log(comprice)

       const comAnnual = response.body.commercialAnnual['price']
       cy.log(comAnnual)

       //Compare the price for perpetual license from the UI to the price captured from commercial price from the XHR network call response
        cy.get('.col-sm-5.standard-tab > .add_margin_40_xs > .panel > .panel-body > :nth-child(1) > .price_show > :nth-child(1) > label > .h3 > .price').then(($ele) =>{
        const pltxt = $ele.text()
        cy.log(pltxt)
        expect(comprice).to.eq(pltxt)
        })

        //Compare the price for annual license from the UI to the price captured from commercialAnnual price from the XHR network call response
        cy.get('.col-sm-5.standard-tab > .add_margin_40_xs > .panel > .panel-body > :nth-child(1) > .price_show > :nth-child(2) > label > .h3 > .price-annual').then(($ele)=>
        {
          const altxt = $ele.text()
          cy.log(altxt)
          expect(comAnnual).to.eq(altxt)
        })
   })

   
  })
       
})