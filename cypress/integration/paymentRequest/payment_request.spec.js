describe("Positive case payment request", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("customer can login", () => {
    cy.loginAsCustomer();
  });

  it("customer can see payment request form", () => {
    cy.findByRole("button", { name: /payment request/i }).click();
    cy.get("[data-test='txt-customer_name']").should("be.visible");
    cy.get("[data-test='select-request']").should("be.visible");
    cy.get("[data-test='txt-amount']").should("be.visible");
    cy.get("[data-test='txt-account_name']").should("be.visible");
    cy.get("[data-test='txt-account_number']").should("be.visible");
    cy.get("[data-test='btn-submit']").should("be.visible");
  });

  it("customer fill payment request form", () => {
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

describe("Negative case payment request", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("customer can login", () => {
    cy.loginAsCustomer();
    cy.findByRole("button", { name: /payment request/i }).click();
  });

  it("customer need to fill customer name", () => {
    cy.get("[data-test='txt-amount']").type("2000000");
    cy.get("[data-test='txt-account_name']").type("recipient1");
    cy.get("[data-test='txt-account_number']").type("123456789");
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/input required!/i).should("be.visible");
    cy.get("[data-test='txt-amount']").clear();
    cy.get("[data-test='txt-account_name']").clear();
    cy.get("[data-test='txt-account_number']").clear();
  });

  it("customer need to fill payment amount", () => {
    cy.get("[data-test='txt-customer_name']").type("mycustomer3");
    cy.get("[data-test='txt-account_name']").type("recipient1");
    cy.get("[data-test='txt-account_number']").type("123456789");
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/input required!/i).should("be.visible");
    cy.get("[data-test='txt-customer_name']").clear();
    cy.get("[data-test='txt-account_name']").clear();
    cy.get("[data-test='txt-account_number']").clear();
  });

  it("customer need to fill recipient name", () => {
    cy.get("[data-test='txt-customer_name']").type("mycustomer3");
    cy.get("[data-test='txt-amount']").type("2000000");
    cy.get("[data-test='txt-account_number']").type("123456789");
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/input required!/i).should("be.visible");
    cy.get("[data-test='txt-customer_name']").clear();
    cy.get("[data-test='txt-amount']").clear();
    cy.get("[data-test='txt-account_number']").clear();
  });

  it("customer need to fill account number", () => {
    cy.get("[data-test='txt-customer_name']").type("mycustomer3");
    cy.get("[data-test='txt-amount']").type("2000000");
    cy.get("[data-test='txt-account_name']").type("recipient1");
    cy.get("[data-test='btn-submit']").click();
    cy.findByText(/input required!/i).should("be.visible");
    cy.get("[data-test='txt-customer_name']").clear();
    cy.get("[data-test='txt-amount']").clear();
    cy.get("[data-test='txt-account_name']").clear();
  });

  after(() => {
    cy.get("[data-test='btn-signout']").click();
    cy.get("[data-test='btn-confirm-signout']").click();
  });
});
