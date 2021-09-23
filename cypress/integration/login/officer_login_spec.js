describe("Officer Login", () => {
  // it("Both input can't be empty", () => {
  //   cy.visit("http://localhost:3000/login-officer");
  //   cy.findByRole("button", { name: /sign in/i }).click();
  //   cy.findByText(/insert username/i).should("be.visible");
  //   cy.findByText(/insert password/i).should("be.visible");
  // });

  // it("username can't be empty", () => {
  //   cy.findByPlaceholderText(/password/i).type("123456");
  //   cy.findByRole("button", { name: /sign in/i }).click();
  //   cy.findByText(/insert username/i).should("be.visible");
  //   cy.findByRole("textbox").clear();
  //   cy.findByPlaceholderText(/password/i).clear();
  // });

  // it("password can't be empty", () => {
  //   cy.findByRole("textbox").type("myuser");
  //   cy.findByRole("button", { name: /sign in/i }).click();
  //   cy.findByText(/insert password/i).should("be.visible");
  //   cy.findByRole("textbox").clear();
  //   cy.findByPlaceholderText(/password/i).clear();
  // });

  it("general support can login", () => {
    cy.visit("http://localhost:3000/login-officer");
    cy.findByRole("textbox").type("mygeneralsupport");
    cy.findByPlaceholderText(/password/i).type("123456");
    // cy.get("[data-test=selectRole]").select("General Support");
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
    cy.visit("http://localhost:3000/login-officer");
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
    cy.visit("http://localhost:3000/login-officer");
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
