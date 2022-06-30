describe("UI validation",function()
{
    it("Navigate",function()
    {

        //lauch url
        cy.visit("https://www.mathworks.com/pricing-licensing.html?prodcode=ML")

        //Verify the MATLAB text on the right box has the url attached to it as
        //https://www.mathworks.com/products/matlab.html
        cy.get('a').invoke('attr','href').should('eq','https://www.mathworks.com/products/matlab.html')

    })

})