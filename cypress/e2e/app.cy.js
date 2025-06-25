describe("Navigation", () => {
  it("should navigate to the about page ", () => {
    cy.visit("http://localhost:3000/");

    cy.get('a[href="/login"]').click();

    cy.url().should("include", "/login");

    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");
  });
});
