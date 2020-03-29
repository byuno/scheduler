describe("Navigation", () => {
  it("1. should visit root", () => {
    cy.visit("/");
  });

  it("2. should navigate to Tuesday", () => {
    cy.visit("/");
    
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item day-list__item--selected");
  });


});