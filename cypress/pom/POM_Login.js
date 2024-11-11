//Used POM for reusing the elements and fucntions
class LoginPage {
  elements = {
    usernameInput: () => cy.get("input[placeholder='Username']"),
    passwordInput: () => cy.get("input[placeholder='Password']"),
    loginButton: () => cy.get("button[type='submit']"),
    errorMessage: () => cy.get("div[role='alert']"),
    fieldErrorMessage: () => cy.get(".oxd-form"),
  };

  enterUsername(username) {
    this.elements.usernameInput().clear().type(username);
  }

  enterPassword(password) {
    this.elements.passwordInput().clear().type(password);
  }

  clickLogin() {
    this.elements.loginButton().click();
  }
}

export default new LoginPage();
