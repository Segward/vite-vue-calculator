describe("Vuex Store", () => {
  beforeEach(() => {
    cy.visit("/contact");
  });

  it("should add user data to db.json", () => {
    const randomNumber = Math.floor(Math.random() * 100000000) + 1;
    const email = `john.doe${randomNumber}@example.com`;
    cy.get("#name").clear();
    cy.get("#email").clear();
    cy.get("#message").clear();
    cy.get("#name").type("John Doe");
    cy.get("#email").type(email);
    cy.get("#message").type("This is a test message.");
    cy.get('button[type="submit"]').click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Form submitted successfully!");
    });
    cy.wait(1000);
    cy.request("http://localhost:3000/users").then((response) => {
      expect(response.status).to.eq(200);
      const user = response.body.find((user) => user.email === email);
      expect(user).to.exist;
      expect(user.name).to.eq("John Doe");
      expect(user.message).to.eq("This is a test message.");
    });
  });
});
