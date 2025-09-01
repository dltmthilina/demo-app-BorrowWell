describe("Dashboard E2E Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should load the homepage successfully", () => {
    cy.get('[data-testid="borrower-card-1"]', { timeout: 10000 }).should(
      "exist"
    );
    cy.get('[data-testid="borrower-card-1"]').first().click();
    cy.get('[data-testid="borrower-detail-name"]').should(
      "contain.text",
      "Sarah Dunn"
    );
  });

  it("expands and collapses the AI Explainability section", () => {
    // Accordion should be collapsed initially
    cy.get('[data-testid="ai-explain-item"]').should(
      "have.attr",
      "data-state",
      "closed"
    );
    cy.get('[data-testid="ai-explain-trigger"]').click();

    cy.get('[data-testid="ai-explain-item"]').should(
      "have.attr",
      "data-state",
      "open"
    );
    cy.get('[data-testid="ai-explain-trigger"]').click();
    cy.get('[data-testid="ai-explain-item"]').should(
      "have.attr",
      "data-state",
      "closed"
    );
  });
    
    it("logs to console when action buttons are clicked", () => { 
        cy.window().then((win) => {
          cy.spy(win.console, "log").as("consoleLog");
        });
        cy.get('[data-testid="ai-explain-trigger"]').click();
         cy.get('[data-testid="request-documents-btn"]').click();
        cy.get("@consoleLog").should(
          "be.calledWith",
          "Request Documents clicked"
        ); 
         cy.get('[data-testid="send-valuer-btn"]').click();
         cy.get("@consoleLog").should(
           "be.calledWith",
           "Send to Valuer clicked"
         );

         // Click Approve button
         cy.get('[data-testid="approve-btn"]').click();
         cy.get("@consoleLog").should("be.calledWith", "Approve clicked");

         // Click Escalate button (if enabled)
         cy.get('[data-testid="escalate-btn"]:not([disabled])').click();
         cy.get("@consoleLog").should(
           "be.calledWith",
           "Escalate to Credit Committee clicked"
         );
    });
});
