describe("Customer Login", () => {
  //   it("Both input can't be empty", () => {
  //     cy.visit("http://localhost:3000/");
  //     cy.findByRole("button", { name: /sign in/i }).click();
  //     cy.findByText(/insert username/i).should("be.visible");
  //     cy.findByText(/insert password/i).should("be.visible");
  //   });

  //   it("username can't be empty", () => {
  //     cy.findByPlaceholderText(/password/i).type("123456");
  //     cy.findByRole("button", { name: /sign in/i }).click();
  //     cy.findByText(/insert username/i).should("be.visible");
  //     cy.findByRole("textbox").clear();
  //     cy.findByPlaceholderText(/password/i).clear();
  //   });

  //   it("password can't be empty", () => {
  //     cy.findByRole("textbox").type("myuser");
  //     cy.findByRole("button", { name: /sign in/i }).click();
  //     cy.findByText(/insert password/i).should("be.visible");
  //     cy.findByRole("textbox").clear();
  //     cy.findByPlaceholderText(/password/i).clear();
  //   });

  //   it("admin can't login", () => {
  //     cy.visit("http://localhost:3000/");
  //     cy.findByRole("textbox").type("myuser");
  //     cy.findByPlaceholderText(/password/i).type("123456");
  //     cy.findByRole("button", { name: /sign in/i }).click();
  //     cy.findByRole("button", { name: /sign in/i }).should("be.disabled");
  //     cy.findByRole("heading", { name: /daftar payment request/i }).should(
  //       "be.visible"
  //     );
  //   });

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
