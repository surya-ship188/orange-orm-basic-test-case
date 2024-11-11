// cypress/support/pages/AdminPage.js
class AdminPage {
  elements = {
    Username: () =>
      cy.xpath(
        "//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']"
      ),
    Status: () =>
      cy.get(
        "body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
      ),
    StatusOption: () =>
      cy.xpath("(//div[@class='oxd-select-text oxd-select-text--active'])[2]"),
    Add: () => cy.get("//button[normalize-space()='Add']"),
    roleOption: () => cy.contains("ESS"), // Dynamic option selector based on role name
    Username: () => cy.get("input[placeholder='Type for hints...']"),
    Status: () => cy.xpath("(//div[contains(text(),'-- Select --')])[1]"),
    Username: () =>
      cy.get(
        "div[class='oxd-form-row'] div[class='oxd-grid-2 orangehrm-full-width-grid'] div[class='oxd-grid-item oxd-grid-item--gutters'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']"
      ),
    Password: () =>
      cy.get(
        "div[class='oxd-grid-item oxd-grid-item--gutters user-password-cell'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[type='password']"
      ),

    ConfirmPassword: () =>
      cy.get(
        "div[class='oxd-grid-item oxd-grid-item--gutters'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[type='password']"
      ),
    EmployeeName: () =>
      cy.get(
        ".oxd-autocomplete-text-input.oxd-autocomplete-text-input--active"
      ),
    SaveBtn: () => cy.xpath("//button[normalize-space()='Save']"),
    CheckSuccess: () => cy.get("//div[@class='data' and text()='Surya k']"),
  };

  // Admin button
  clickAdminButton() {
    cy.xpath("//a[normalize-space()='Admin']").click();
  }

  // Add button
  clickAddButton() {
    cy.xpath("//button[normalize-space()='Add']").click();
  }

  ClickStatus() {
    this.elements.Status().click();
    this.elements.roleOption().click({ force: true });
  }
  SelectEmployeename() {
    this.elements.EmployeeName().type("Surya k{Enter}");
    cy.wait(5000);
    cy.contains("Surya k").click();
  }

  ClickUsername() {
    this.elements.Username().clear().type("Surya12345");
  }
  SelectSStatus() {
    this.elements.Status().click();
    cy.contains("Enabled").click();
  }
  SelectPassword() {
    this.elements.Password().clear().type("Surya@123");
  }
  confirmPassword() {
    this.elements.ConfirmPassword().clear().type("Surya@123");
  }
  clickSSavebtn() {
    this.elements.SaveBtn().click();
  }
  CheckSystemusers() {
    this.elements.CheckSuccess().should("contain", "Surya k");
  }
}

export default new AdminPage();
