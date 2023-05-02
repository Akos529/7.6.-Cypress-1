beforeEach(() => {
  cy.visit("/");
});
describe("login page", () => {
  it("login user", () => {
    Cypress.env("phoneViewportHeight");
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("fails to login with empty login", () => {
    cy.login(null, "test");

    cy.get("#mail")
      .then((element) => element[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then((element) => element[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });
});

describe("favorites", () => {
  beforeEach(() => {
    cy.login("test@test.com", "test");
  });
  it("add new book without adding to favorites", () => {
    cy.contains("Add new").click();
    cy.get("#title").type("Книга 1");
    cy.contains("Submit").click();
    cy.contains("Книга 1").should("be.visible");
    cy.contains("Favorite").click();
    cy.get(".btn > a").should("be.visible");
  });
  it("add new book to favorites", () => {
    cy.contains("Add new").click();
    cy.get("#title").type("Книга 1");
    cy.get("#favorite").click();
    cy.contains("Submit").click();
    cy.contains("Favorite").click();
    cy.contains("Книга 1").should("be.visible");
  });
  it("delete from favorites", () => {
    cy.contains("Favorite").click();
    cy.contains("Delete from favorite").click();
    cy.get(".btn > a").should("be.visible");
  });
});
