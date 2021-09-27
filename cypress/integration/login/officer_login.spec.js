describe("Optimistic Officer Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login-officer");
  });

  it("officer can see login form", () => {
    cy.get("[data-test='txt-username']").should("be.visible");
    cy.get("[data-test='txt-password']").should("be.visible");
    cy.get("[data-test='select-role']").should("be.visible");
    cy.get("[data-test='select-role']").click();
    cy.get("[data-test='opt-role-generalSupport']")
      .should("be.visible")
      .click();
    cy.get("[data-test='select-role']").click();
    cy.get("[data-test='opt-role-accounting']").should("be.visible").click();
    cy.get("[data-test='select-role']").click();
    cy.get("[data-test='opt-role-admin']").should("be.visible").click();
    cy.get("[data-test='btn-submit']").should("be.visible");
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

describe("Pesimistic Officer Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login-officer");
  });

  it("show error when both input empty", () => {
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/insert username/i);
    cy.findByText(/insert password/i);
  });

  it("show error when username input empty", () => {
    cy.get("[data-test='txt-password']").type("123456");
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/insert username/i);
  });

  it("show error when password input empty", () => {
    cy.get("[data-test='txt-username']").type("myadmin");
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/insert password/i);
  });

  it("show error when username and password wrong", () => {
    cy.get("[data-test='txt-username']").type("myadmin");
    cy.get("[data-test='txt-password']").type("1234567");
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/password\/username is incorrect/i);
  });
});
