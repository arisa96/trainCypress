let token
let attID

before(() => {
        cy.POST_Auth().then((res_token) => {
            token = res_token
            cy.log(token).wait(2000)
            })
        })


describe('API',() => {
    // it.skip('GET_User',() => {
    // cy.GET_User().then((response) => {
    //     expect(response.status).to.eq(200);
    //     var data = response.body
    //     cy.log(data).wait(1000)
    //     cy.log(data[0].fname).wait(1000)
    //     cy.log(data[1].fname).wait(1000)
    //     cy.log(data[2].fname).wait(1000)
    //     assert.equal(data[0].fname, 'Karn')
    //     assert.equal(data[1].fname, 'Ivy')
    //     assert.equal(data[2].fname, 'Walter')
    // })
    // });

    // it('POST Auth', () => {
    // cy.POST_Auth().then((res_token) => {
    //     token = res_token
    //     cy.log(token).wait(2000)
    //     })
    // });

    it('POST_Attraction', () => {
        cy.POST_Attraction(token).then((response) => {
            expect(response.status).to.eq(200);
            var data = response.body
            cy.log(data.attraction.name).wait(1000)
            cy.log("i got id : " + data.attraction.id).wait(1000)
            attID = data.attraction.id
            cy.log("you att id is : " + attID).wait(1000)
            assert.equal(data.attraction.name, 'M University')
            })
        });
        it('POST_UpdateAttraction', () => {
            cy.POST_UpdateAttraction(token,attID).then((response) => {
                expect(response.status).to.eq(200);
                var data = response.body
                cy.log("you id is : " + data.attraction.id).wait(1000)
                assert.equal(data.attraction.id, attID)
                cy.log("you id name : " + data.attraction.name).wait(1000)
                assert.equal(data.attraction.name, 'M University Update')
                })
            });
    })

