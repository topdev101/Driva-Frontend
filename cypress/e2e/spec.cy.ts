/// <reference types="cypress" />

describe('Driva Loan Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('completes the full loan application flow and shows offers', () => {

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('select[name="employmentStatus"]').select('Employed');
    cy.get('input[name="employerName"]').type('ACME');
    cy.contains('Next').click();

    cy.get('select[name="loanPurpose"]').select('Vehicle');
    cy.get('input[name="amount"]').type('5000');
    cy.get('input[name="deposit"]').type('1000');
    cy.get('input[name="term"]').type('3');
    cy.contains('Submit').click();

    cy.contains('Loan Offers').should('be.visible');
    cy.get('.bg-gray-50').should('have.length', 3);
  });
});