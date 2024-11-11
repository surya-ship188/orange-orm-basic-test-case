import LoginPage from "../../pom/POM_Login";

Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
describe("Login Regression Suite", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  });

  it("should login successfully with valid credentials", () => {
    cy.fixture("loginData").then((data) => {
      const { username, password } = data.validCredentials;
      LoginPage.enterUsername(username);
      LoginPage.enterPassword(password);
      LoginPage.clickLogin();

      // Validate successful login
      cy.url().should("include", "/dashboard");
    });
  });

  it("should show error message with invalid credentials", () => {
    cy.fixture("loginData").then((data) => {
      data.invalidCredentials.forEach((credentials) => {
        LoginPage.enterUsername(credentials.username);
        LoginPage.enterPassword(credentials.password);
        LoginPage.clickLogin();

        // Verify error message appears for invalid login
        LoginPage.elements
          .errorMessage()
          .should("be.visible")
          .and("contain", "Invalid credentials");

        // Reset between attempts
        cy.reload();
      });
      data.EmptyCredentials.forEach((credentials) => {
        LoginPage.enterUsername(credentials.username);
        LoginPage.enterUsername(credentials.password);
        LoginPage.clickLogin();

        LoginPage.elements
          .fieldErrorMessage()
          .should("be.visible")
          .and("contain", "Required");
      });
    });
  });
});
