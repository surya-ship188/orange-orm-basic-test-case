class Dashboard {
  elements = {
    PIM_Button: () => cy.xpath("//span[normalize-space()='PIM']"),
    Employee_AddButton: () => cy.xpath("//button[normalize-space()='Add']"),
  };

  Click_PIM_Button() {
    this.elements.PIM_Button().should("be.visible").click();
  }
  Click_Employee_AddButton() {
    this.elements.Employee_AddButton().should("be.visible").click();
  }
}
export default new Dashboard();
