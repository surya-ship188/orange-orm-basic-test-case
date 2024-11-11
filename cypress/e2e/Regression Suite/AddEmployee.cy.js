import LoginPage from "../../pom/POM_Login";
import Dashboard from "../../pom/POM_PIM";
import AddEmployee from "../../pom/POM_employee";
//genrate random number

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

      //Enter PIM
      Dashboard.Click_PIM_Button();

      // Verify whether it is redirected to employeelist
      cy.url().should("include", "/pim/viewEmployeeList");

      //Click on the employee add button
      Dashboard.Click_Employee_AddButton();
      //verify whether it is redirected to the add employee page
      cy.url().should("include", "/pim/addEmployee");
      cy.fixture("EmployeeData").then((empData) => {
        AddEmployee.enterFirstName(empData.firstName);
        AddEmployee.enterLastName(empData.lastName);

        //generate empid random number
        function getRandomEmployeeId() {
          return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
        }
        AddEmployee.enterEmployeeId(getRandomEmployeeId());

        AddEmployee.clickSave();

        //check employee creation
        AddEmployee.elements.addedEmp().should("contain", empData.firstName);
      });
    });
  });
});
