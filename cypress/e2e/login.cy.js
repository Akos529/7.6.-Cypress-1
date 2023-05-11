beforeEach(() => {
  cy.visit("/");
});
describe("login page", () => {
  it("login user", () => {
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
    cy.addBook("Книга3");
    cy.contains("Favorite").click();
    cy.get(".btn > a").should("be.visible");
  });
  it("add new book to favorites", () => {
    cy.addFavouriteBook("Книга5");
    cy.contains("Favorite").click();
    cy.contains("Книга5").should("be.visible");
  });
  it("delete from favorites", () => {
    cy.contains("Favorite").click();
    cy.contains("Delete from favorite").click();
    cy.get(".btn > a").should("be.visible");
  });
});
