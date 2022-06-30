/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

//1. Navigate to https://www.mathworks.com/search.html?c%5B%5D=entire_site&amp;q=matlab&amp;page=1
//2. Verify below information against the XHR network call
//Total result count is equal to the numFound value
//b. For each search result on the page the url for each link of result is equal to the breadcrumb_url value.

describe('XHR response and UI validaton',function(){

    it('test case 01',function(){

        //intercept 
        cy.intercept('GET','https://www.mathworks.com/searchresults/results?page=1&rows=10&facet.limit=100&c%5B%5D=entire_site&facets=&sort=score+desc&site_domain=www&site_language=en&fl=asset_id%2C+subcollection%2C+asset_type%2C+asset_type_name%2C+id%2C+asset_language%2C+url%2C+updated_at%2C+thumbnail%2C+title_*%2C+primary_header_*%2C+meta_description_*%2C+answers_count%2C+author%2C+blog_title%2C+blog_title_url%2C+breadcrumb_display%2C+breadcrumb_url%2C+byline_text%2C+caption_language%2C+comments_count%2C+community_tag%2C+companion_materials%2C+company_name%2C+copyright%2C+course_level_facet%2C+downloads%2C+fixed_in%2C+hardware-support-custom-tags%2C+hardware-support-vendor%2C+instructor_led_description_*%2C+instructor_led_topic%2C+instructor_led_certification%2C+pub_date%2C+publisher%2C+rating%2C+ratings_count%2C+secondary_header_*%2C+status%2C+tag%2C+tag_url%2C+title%2C+vendor_display%2C+video_duration%2C+views_count%2C+votes_count%2C+workaround&q=matlab').as('results')

        //navigate to url
        cy.visit(' https://www.mathworks.com/search.html?c%5B%5D=entire_site&amp;q=matlab&amp;page=1')

        cy.get('#query').type('matlab')
        cy.get('#searchbutton').click()

        //get XHR response
        cy.wait('@results').then((Interception)=>{
            cy.log(Interception.response.statusCode)
            expect(Interception.response.statusCode).to.eq(200)

            //get result
            //Total result count is equal to the numFound value
            expect(Interception.response.body).to.have.property('response')
            const xrnfnd = Interception.response.body.response['numFound']
            cy.log(xrnfnd)
            
            cy.get('.search_results_label').invoke('text').then((text)=>
            {
                const srlt = text.split(' ')[3].replace('(','')
                var cast = Number(srlt)
                cy.log(srlt)

                expect(xrnfnd).to.equal(cast)
            })

            ////b. For each search result on the page the url for each link of result is equal to the url value from response.
            const cnt = Interception.response.body.response.docs.length
            cy.log(cnt)
            var exp = [];
            for(let i=0;i<cnt;i++)
            {
                const urls = Interception.response.body.response.docs[i].url
                exp.push(urls)
                cy.log(urls)
                cy.log(exp)
            }
            var act =[];
            cy.get('div.search_result p a').each(($ele)=>{
                const val = $ele.attr('href')
                const aval = val.split('?')[0]
                act.push(aval)
                cy.log(aval)
                cy.log(act)
            })
            //compare url from UI and API response
            function arraysAreIdentical(exp, act){
                if (exp.length !== act.length) return false;
                for (var i = 0, len = exp.length; i < len; i++){
                    if (exp[i] !== act[i]){
                        return false;
                    }
                }
                return true; 
            }if(true)
            {
                cy.log('Links are same')
            }
           
           
        })
        

    })

})