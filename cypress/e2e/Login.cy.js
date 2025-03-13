describe("Login Form", () => {
    beforeEach(() => {
      cy.visit("/login");
    });
  
    it("should say login successful", () => {
      cy.get("#username").type("admin");
      cy.get("#password").type("admin");
      cy.get('button[type="submit"]').click();
      cy.on("window:alert", (str) => {
        expect(str).to.equal("Login successful");
      });
    });
  
    it("should say login failed", () => {
      cy.get("#username").type("admin");
      cy.get("#password").type("wrongpassword");
      cy.get('button[type="submit"]').click();
      cy.on("window:alert", (str) => {
        expect(str).to.equal("Invalid username or password");
      });
    });
  
    it("should say login failed", () => {
      cy.get("#password").type("admin");
      cy.get('button[type="submit"]').click();
      cy.on("window:alert", (str) => {
        expect(str).to.equal("Invalid username or password");
      });
    });
  
    it("should say login failed", () => {
      cy.get("#username").type("admin");
      cy.get('button[type="submit"]').click();
      cy.on("window:alert", (str) => {
        expect(str).to.equal("Invalid username or password");
      });
    });
  
    it("should say login failed", () => {
      cy.get('button[type="submit"]').click();
      cy.on("window:alert", (str) => {
        expect(str).to.equal("Invalid username or password");
      });
    });
  });