import LoginPage from "../../pom/POM_Login";
import Dashboard from "../../pom/POM_PIM";
import AdminPage from "../../pom/POM_Admin";
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);
});
describe("Create new employee", () => {
  before(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  });
  it("Login to Orange HRM and Create employee successfully", () => {
    cy.fixture("loginData").then((data) => {
      const { username, password } = data.validCredentials;

      // Log in
      LoginPage.enterUsername(username);
      LoginPage.enterPassword(password);
      LoginPage.clickLogin();

      //Enter admin settings
      cy.wait(5000);
      AdminPage.clickAdminButton();
      AdminPage.clickAddButton();
    });
    cy.fixture("SystemUserData").then((data) => {
      AdminPage.ClickStatus();
      AdminPage.ClickUsername();
      AdminPage.SelectEmployeename();
      AdminPage.SelectSStatus();
      AdminPage.SelectPassword();
      AdminPage.confirmPassword();
      AdminPage.clickSSavebtn();
      AdminPage.CheckSystemusers();
    });
  });
});
