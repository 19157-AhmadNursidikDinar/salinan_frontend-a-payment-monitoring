describe("Customer Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("customer can login", () => {
    cy.findByRole("textbox").type("myuser");
    cy.findByPlaceholderText(/password/i).type("123456");
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.findByRole("heading", { name: /daftar payment request/i }).should(
      "be.visible"
    );
    cy.findByRole("button", { name: /sign out/i }).click();
    cy.findByRole("button", { name: /sign out/i }).click();
  });
});
