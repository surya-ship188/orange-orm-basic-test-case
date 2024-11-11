class AddEmployee {
  elements = {
    firstNameInput: () => cy.get("input[placeholder='First Name']"),
    lastNameInput: () => cy.get("input[placeholder='Last Name']"),
    employeeIdInput: () =>
      cy
        .get(
          "div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']"
        )
        .clear(),
    saveButton: () => cy.get("button[type='submit']"),
    addedEmp: () => cy.get(".oxd-text.oxd-text--h6.--strong"),

    errorMessage: () => cy.get(".validation-error"),
  };

  // Methods for entering data
  enterFirstName(firstName) {
    this.elements.firstNameInput().clear().type(firstName);
  }

  enterLastName(lastName) {
    this.elements.lastNameInput().clear().type(lastName);
  }

  enterEmployeeId(employeeId) {
    this.elements.employeeIdInput().type(employeeId);
  }

  clickSave() {
    this.elements.saveButton().click();
  }

  validateSuccessfulSave() {
    cy.url().should("include", "/viewEmployeeList"); // Update URL part to match successful save navigation
  }
}

export default new AddEmployee();
