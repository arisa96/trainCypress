describe("Registration", () => {
  it("test log", () => {
    cy.visit('/')
    cy.get('[role="combobox"]').click()
    cy.get('.v-list-item').contains('EN').click()
    cy.get('#input-7').click()
    cy.get('#input-9').type("May")
    cy.get('#input-11').type("Tester")
    cy.get( '#input-18[type="radio"] ').check("citizen");
    cy.get('#input-42').type("1111111111")
    cy.get('#input-42-messages > .v-messages__message').should('have.text',"ภาษาไทยจะพังไหม.")
  })
});