describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get("button[type='submit']").click();
    cy.visit("/");
  });

  it("should display 0 initially", () => {
    cy.get(".display").should("have.text", "0");
  });

  it("should append numbers to the display", () => {
    cy.get(".btn").contains("1").click();
    cy.get(".btn").contains("2").click();
    cy.get(".btn").contains("3").click();
    cy.get(".display").should("have.text", "123");
  });

  it("should perform addition correctly", () => {
    cy.get(".btn").contains("1").click();
    cy.get(".btn-op").contains("+").click();
    cy.get(".btn").contains("2").click();
    cy.get(".btn-op").contains("=").click();
    cy.get(".display").should("have.text", "3");
  });

  it("should perform subtraction correctly", () => {
    cy.get(".btn").contains("5").click();
    cy.get(".btn-op").contains("-").click();
    cy.get(".btn").contains("3").click();
    cy.get(".btn-op").contains("=").click();
    cy.get(".display").should("have.text", "2");
  });

  it("should perform multiplication correctly", () => {
    cy.get(".btn").contains("4").click();
    cy.get(".btn-op").contains("*").click();
    cy.get(".btn").contains("3").click();
    cy.get(".btn-op").contains("=").click();
    cy.get(".display").should("have.text", "12");
  });

  it("should perform division correctly", () => {
    cy.get(".btn").contains("8").click();
    cy.get(".btn-op").contains("/").click();
    cy.get(".btn").contains("2").click();
    cy.get(".btn-op").contains("=").click();
    cy.get(".display").should("have.text", "4");
  });

  it("should clear the display when C is clicked", () => {
    cy.get(".btn").contains("1").click();
    cy.get(".btn").contains("2").click();
    cy.get(".btn").contains("C").click();
    cy.get(".display").should("have.text", "0");
  });

  it("should delete the last character when DEL is clicked", () => {
    cy.get(".btn").contains("1").click();
    cy.get(".btn").contains("2").click();
    cy.get(".btn").contains("3").click();
    cy.get(".btn").contains("DEL").click();
    cy.get(".display").should("have.text", "12");
  });

  it("should use the previous answer when ANS is clicked", () => {
    cy.get(".btn").contains("2").click();
    cy.get(".btn-op").contains("+").click();
    cy.get(".btn").contains("3").click();
    cy.get(".btn-op").contains("=").click();
    cy.get(".btn").contains("C").click();
    cy.get(".btn").contains("ANS").click();
    cy.get(".display").should("have.text", "5");
  });

  it("should display error for division by zero", () => {
    cy.get(".btn").contains("1").click();
    cy.get(".btn-op").contains("/").click();
    cy.get(".btn").contains("0").click();
    cy.get(".btn-op").contains("=").click();
    cy.get(".display").should("have.text", "Error");
  });

  it("should display history of calculations", () => {
    cy.get(".btn").contains("1").click();
    cy.get(".btn-op").contains("+").click();
    cy.get(".btn").contains("2").click();
    cy.get(".btn-op").contains("=").click();
    cy.get(".btn-op").contains("Fetch History").click();
    cy.get(".history ul li").should("contain.text", "1+2 = 3");
  });
  

});
