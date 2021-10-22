import "@testing-library/cypress/add-commands";
// const COMMAND_DELAY = 2000;

// for (const command of [
//   "visit",
//   "click",
//   "trigger",
//   "type",
//   "clear",
//   "reload",
//   "contains",
// ]) {
//   Cypress.Commands.overwrite(command, (originalFn, ...args) => {
//     const origVal = originalFn(...args);

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(origVal);
//       }, COMMAND_DELAY);
//     });
//   });
// }

Cypress.Commands.add("loginAsAdmin", () => {
  cy.get("[data-test='txt-username']").type("myadmin");
  cy.get("[data-test='txt-password']").type("123456");
  cy.get("[data-test='select-role']")
    .click()
    .get("[data-test='opt-role-admin']")
    .click();
  cy.get("[data-test='btn-submit']").click();
  cy.findByRole("heading", { name: /beranda admin/i }).should("be.visible");
});

Cypress.Commands.add("loginAsGS", () => {
  cy.get("[data-test='txt-username']").type("mygeneral");
  cy.get("[data-test='txt-password']").type("123456");
  cy.get("[data-test='select-role']")
    .click()
    .get("[data-test='opt-role-generalSupport']")
    .click();
  cy.get("[data-test='btn-submit']").click();
  cy.findByRole("heading", { name: /daftar payment request/i }).should(
    "be.visible"
  );
});

Cypress.Commands.add("loginAsAccounting", () => {
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
});

Cypress.Commands.add("loginAsCustomer", () => {
  cy.get("[data-test='txt-username']").type("myuser");
  cy.get("[data-test='txt-password']").type("123456");
  cy.get("[data-test='btn-submit']").click();
  cy.findByRole("heading", { name: /daftar payment request/i }).should(
    "be.visible"
  );
});

Cypress.Commands.add("logOut", () => {
  cy.get("[data-test='btn-signout']").click();
  cy.get("[data-test='btn-confirm-signout']").click();
});
