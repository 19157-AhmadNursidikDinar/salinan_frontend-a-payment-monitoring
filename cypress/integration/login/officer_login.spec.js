describe("Officer Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login-officer");
  });

  it("general support can login", () => {
    cy.findByRole("textbox").type("mygeneralsupport");
    cy.findByPlaceholderText(/password/i).type("123456");
    cy.findByRole("button", { name: /general support/i }).click();
    cy.findByRole("option", { name: /general support/i }).click();
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.findByRole("heading", { name: /daftar payment request/i }).should(
      "be.visible"
    );
    cy.findByRole("button", { name: /sign out/i }).click();
    cy.findByRole("button", { name: /sign out/i }).click();
  });

  it("accounting can login", () => {
    cy.findByRole("textbox").type("myaccounting");
    cy.findByPlaceholderText(/password/i).type("123456");
    cy.findByRole("button", { name: /general support/i }).click();
    cy.findByRole("option", { name: /general support/i }).click();
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.findByRole("heading", { name: /daftar payment request/i }).should(
      "be.visible"
    );
    cy.findByRole("button", { name: /sign out/i }).click();
    cy.findByRole("button", { name: /sign out/i }).click();
  });

  it("admin can login", () => {
    cy.findByRole("textbox").type("myadmin");
    cy.findByPlaceholderText(/password/i).type("123456");
    cy.findByRole("button", { name: /general support/i }).click();
    cy.findByRole("option", { name: /general support/i }).click();
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.findByRole("heading", { name: /beranda admin/i }).should("be.visible");
    cy.findByRole("button", { name: /sign out/i }).click();
    cy.findByRole("button", { name: /sign out/i }).click();
  });
});
