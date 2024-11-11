import LoginPage from "../../pom/POM_Login";

Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
describe("Login Regression Suite", { testIsolation: false }, () => {
  before(() => {
    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
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

  it("Check Worktime API", () => {
    // Make a request to the API
    cy.request({
      method: "GET",
      url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/time-at-work?timezoneOffset=5.5&currentDate=2024-11-11&currentTime=20:08",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // Validate the response status code
      expect(response.status).to.eq(200);

      // Validate that the response has a 'data' property which is an array
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array");

      // Check if the array is not empty and validate structure of items within 'data'
      if (response.body.data.length > 0) {
        const firstItem = response.body.data[0];
        expect(firstItem).to.have.property("totalTime").and.to.be.a("object");
        expect(firstItem).to.have.property("workDay").and.to.be.a("object");
      }
    });
  });
  it("Validates Action Summary API", () => {
    cy.request({
      method: "GET",
      url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data").that.is.an("array");
      expect(response.body).to.have.property("meta").that.is.an("array");
      expect(response.body).to.have.property("rels").that.is.an("array");
    });
  });

  // Test for '/shortcuts'
  it("Validates Shortcuts API", () => {
    cy.request({
      method: "GET",
      url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("object");
    });
  });

  // Test for '/buzz/feed'
  it("Validates Buzz Feed API", () => {
    cy.request({
      method: "GET",
      url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/feed",
      qs: {
        limit: 5,
        offset: 0,
        sortOrder: "DESC",
        sortField: "share.createdAtUtc",
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data").that.is.an("array");
    });
  });

  // Test for '/leaves'
  it("Validates Leaves API", () => {
    cy.request({
      method: "GET",
      url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/leaves",
      qs: { date: "2024-11-11" },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      // Validate the response status code
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property("data").that.is.an("array");
    });
  });

  // Test for '/subunit'
  it("Validates Subunit API", () => {
    cy.request({
      method: "GET",
      url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data").that.is.an("array");
    });
  });

  // Test for '/events/push' (POST request)
  it("Validates Events Push API", () => {
    cy.request({
      method: "POST",
      url: "https://opensource-demo.orangehrmlive.com/web/index.php/events/push",
      headers: { "Content-Type": "application/json" },
      body: {}, // Adjust the request body if needed
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
