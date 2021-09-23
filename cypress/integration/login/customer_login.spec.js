describe("Customer Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("customer can login", () => {
    cy.get("[data-test='txt-username']").type("myuser");
    cy.get("[data-test='txt-password']").type("123456");
    cy.get("[data-test='btn-submit']").click();
    cy.findByRole("heading", { name: /daftar payment request/i }).should(
      "be.visible"
    );
    cy.get("[data-test='btn-signout']").click();
    cy.get("[data-test='btn-confirm-signout']").click();
  });
});
