describe("start new chat", () => {
  it("should start a new chat", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy="new-chat-dialog"]').click();
    cy.get('[data-cy="name-input"]').type("Bob");
    cy.get('[data-cy="start-chat-button"]').click();
    cy.get('[data-cy="msg-input"]').type("Are you there bot?");
    cy.get('[data-cy="msg-send"]').click();
    cy.get('[data-cy="first-user-message"]').should("exist");
  });
});
