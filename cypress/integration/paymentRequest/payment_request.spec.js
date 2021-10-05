describe("Customer Login", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("customer can login", () => {
    cy.get("[data-test='txt-username']").type("mycustomer3");
    cy.get("[data-test='txt-password']").type("123456");
    cy.get("[data-test='btn-submit']").click();
    cy.findByRole("heading", { name: /daftar payment request/i }).should(
      "be.visible"
    );
  });

  it("customer fill payment request form", () => {
    cy.findByRole("button", { name: /payment request/i }).click();
    cy.get("[data-test='txt-customer_name']").type("mycustomer3");
    cy.get("[data-test='select-request']").click().first().click();
    cy.get("[data-test='txt-amount']").type("2000000");
    cy.get("[data-test='txt-account_name']").type("recipient1");
    cy.get("[data-test='txt-account_number']").type("123456789");
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/payment request berhasil dibuat!/i).should("be.visible");
  });

  after(() => {
    cy.get("[data-test='btn-signout']").click();
    cy.get("[data-test='btn-confirm-signout']").click();
  });
});
