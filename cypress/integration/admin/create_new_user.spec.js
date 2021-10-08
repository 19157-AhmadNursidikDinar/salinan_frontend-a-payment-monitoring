describe("Optimistic case create new user", () => {
  const date = new Date();
  const userData = {
    fullname: "Test User " + date.getTime(),
    username: "usr" + date.getTime(),
    password: "123456",
  };

  before(() => {
    cy.visit("http://localhost:3000/login-officer");
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
    cy.findByRole("button", { name: /add account/i }).click();
  });

  it("admin can see the new user form", () => {
    cy.get("[data-test='txt-fullname']").should("be.visible");
    cy.get("[data-test='select-role']").should("be.visible");
    cy.get("[data-test='txt-username']").should("be.visible");
    cy.get("[data-test='txt-password']").should("be.visible");
    cy.get("[data-test='txt-passwordConfirmation']").should("be.visible");
    cy.get("[data-test='btn-submit']").should("be.visible");
  });

  it("admin can add new user", () => {
    cy.get("[data-test='txt-fullname']").type(userData.fullname);
    cy.get("[data-test='txt-username']").type(userData.username);
    cy.get("[data-test='txt-password']").type(userData.password);
    cy.get("[data-test='txt-passwordConfirmation']").type(userData.password);
    cy.get("[data-test='btn-submit']").click();
    cy.findByRole("heading", { name: /beranda admin/i }).should("be.visible");
  });

  after(() => {
    cy.get("[data-test='btn-signout']").click();
    cy.get("[data-test='btn-confirm-signout']").click();
  });
});

describe("Pesimistic case create new user", () => {
  const date = new Date();
  const userData = {
    fullname: "Test User " + date.getTime(),
    username: "usr" + date.getTime(),
    password: "123456",
  };

  before(() => {
    cy.visit("http://localhost:3000/login-officer");
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
    cy.findByRole("button", { name: /add account/i }).click();
  });

  it("admin need to fill fullname", () => {
    cy.get("[data-test='txt-username']").type(userData.username);
    cy.get("[data-test='txt-password']").type(userData.password);
    cy.get("[data-test='txt-passwordConfirmation']").type(userData.password);
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/input required/i);
    cy.get("[data-test='txt-username']").type("{selectall}{backspace}");
    cy.get("[data-test='txt-password']").type("{selectall}{backspace}");
    cy.get("[data-test='txt-passwordConfirmation']").type(
      "{selectall}{backspace}"
    );
  });

  it("admin need to fill username", () => {
    cy.get("[data-test='txt-fullname']").type(userData.fullname);
    cy.get("[data-test='txt-password']").type(userData.password);
    cy.get("[data-test='txt-passwordConfirmation']").type(userData.password);
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/input required/i);
    cy.get("[data-test='txt-fullname']").type("{selectall}{backspace}");
    cy.get("[data-test='txt-password']").type("{selectall}{backspace}");
    cy.get("[data-test='txt-passwordConfirmation']").type(
      "{selectall}{backspace}"
    );
  });

  it("admin need to fill password", () => {
    cy.get("[data-test='txt-fullname']").type(userData.fullname);
    cy.get("[data-test='txt-username']").type(userData.username);
    cy.get("[data-test='txt-passwordConfirmation']").type(userData.password);
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/input required/i);
    cy.get("[data-test='txt-fullname']").type("{selectall}{backspace}");
    cy.get("[data-test='txt-username']").type("{selectall}{backspace}");
    cy.get("[data-test='txt-passwordConfirmation']").type(
      "{selectall}{backspace}"
    );
  });

  it("admin password input need to be match", () => {
    cy.get("[data-test='txt-fullname']").type(userData.fullname);
    cy.get("[data-test='txt-username']").type(userData.username);
    cy.get("[data-test='txt-password']").type(userData.password);
    cy.get("[data-test='txt-passwordConfirmation']").type("wrongmatch");
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/passwords must match/i);
    cy.get("[data-test='txt-fullname']").type("{selectall}{backspace}");
    cy.get("[data-test='txt-username']").type("{selectall}{backspace}");
    cy.get("[data-test='txt-password']").type("{selectall}{backspace}");
    cy.get("[data-test='txt-passwordConfirmation']").type(
      "{selectall}{backspace}"
    );
  });

  after(() => {
    cy.get("[data-test='btn-signout']").click();
    cy.get("[data-test='btn-confirm-signout']").click();
  });
});
