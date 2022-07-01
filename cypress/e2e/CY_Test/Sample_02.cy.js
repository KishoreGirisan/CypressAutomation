// Price comparison of UI vs XHR responses using cy.intercept

/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Verify XHR',function()
{

it('XHR validation',function()
{
 //Intercept http request and get response body    
cy.intercept('GET','https://www.mathworks.com/content/mathworks/www/en/pricing-licensing/jcr:content.product.json?baseCode=ML').as('priceinfo')

cy.visit('https://www.mathworks.com/pricing-licensing.html?prodcode=ML')

cy.wait('@priceinfo').then((interception)=>{

cy.log(interception.response.statusCode)
cy.log(interception.response.body)
expect(interception.response.statusCode).to.eq(200)

expect(interception.response.body).to.have.property('commercial')
const Cprice = interception.response.body.commercial['price']
cy.log(Cprice)
const Caprice = interception.response.body.commercialAnnual['price']
cy.log(Caprice)


  //Compare the price for perpetual license from the UI to the price captured from commercial price from the XHR network call response
cy.get('.col-sm-5.standard-tab > .add_margin_40_xs > .panel > .panel-body > :nth-child(1) > .price_show > :nth-child(1) > label > .h3 > .price').then(($ele) =>{
    const pltxt = $ele.text()
    cy.log(pltxt)
    expect(Cprice).to.eq(pltxt)
})

//Compare the price for annual license from the UI to the price captured from commercialAnnual price from the XHR network call response
cy.get('.col-sm-5.standard-tab > .add_margin_40_xs > .panel > .panel-body > :nth-child(1) > .price_show > :nth-child(2) > label > .h3 > .price-annual').then(($ele)=>
{
  const altxt = $ele.text()
  cy.log(altxt)
  expect(Caprice).to.eq(altxt)
})



})
  
})
})