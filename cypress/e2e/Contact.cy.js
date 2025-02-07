describe("Contact Form", () => {
  beforeEach(() => {
    cy.visit("/contact");
  });

  it("should enable the submit button when the form is valid", () => {
    cy.get("#name").type("John Doe");
    cy.get("#email").type("john.doe@example.com");
    cy.get("#message").type("This is a test message.");
    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("should disable the submit button when the form is empty", () => {
    cy.get("#name").clear();
    cy.get("#email").clear();
    cy.get("#message").clear();
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("should disable the submit button when the form is invalid", () => {
    cy.get("#name").type("John Doe");
    cy.get("#email").type("john.doe.not-an-email");
    cy.get("#message").clear();
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("should submit the form successfully", () => {
    const randomNumber = Math.floor(Math.random() * 100000000) + 1;
    const email = `john.doe${randomNumber}@example.com`;
    cy.get("#name").type("John Doe");
    cy.get("#email").type(email);
    cy.get("#message").type("This is a test message.");
    cy.get('button[type="submit"]').click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Form submitted successfully!");
    });
  });
});
