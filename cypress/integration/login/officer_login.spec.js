describe("Officer Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login-officer");
  });

  it("general support can login", () => {
    cy.get("[data-test='txt-username']").type("mygeneralsupport");
    cy.get("[data-test='txt-password']").type("123456");
    cy.get("[data-test='select-role']")
      .click()
      .get("[data-test='opt-role-generalSupport']")
      .click();
    cy.get("[data-test='btn-submit']").click();
    cy.findByRole("heading", { name: /daftar payment request/i }).should(
      "be.visible"
    );
    cy.get("[data-test='btn-signout']").click();
    cy.get("[data-test='btn-confirm-signout']").click();
  });

  it("accounting can login", () => {
    cy.get("[data-test='txt-username']").type("myaccounting");
    cy.get("[data-test='txt-password']").type("123456");
    cy.get("[data-test='select-role']")
      .click()
      .get("[data-test='opt-role-accounting']")
      .click();
    cy.get("[data-test='btn-submit']").click();
    cy.findByRole("heading", { name: /daftar payment request/i }).should(
      "be.visible"
    );
    cy.get("[data-test='btn-signout']").click();
    cy.get("[data-test='btn-confirm-signout']").click();
  });

  it("admin can login", () => {
    cy.get("[data-test='txt-username']").type("myadmin");
    cy.get("[data-test='txt-password']").type("123456");
    cy.get("[data-test='select-role']")
      .click()
      .get("[data-test='opt-role-admin']")
      .click();
    cy.get("[data-test='btn-submit']").click();
    cy.findByRole("heading", { name: /beranda admin/i }).should("be.visible");
    cy.get("[data-test='btn-signout']").click();
    cy.get("[data-test='btn-confirm-signout']").click();
  });
});
