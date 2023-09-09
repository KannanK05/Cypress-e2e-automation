import loginPage from '../../pageobjects/loginPage'
import homePage from '../../pageobjects/homePage'
import billPage from '../../pageobjects/billPaymentPage'

describe("Login Parabank", () => {
    let fixtureData;
    const loginObj = new loginPage();
    const homeObj = new homePage();
    const billObj = new billPage();

    beforeEach(function ()  {      
      cy.visit("/");
      cy.fixture('user.json').then((testData)=>{
       fixtureData  = testData;
       loginObj.loginApp(fixtureData.username,fixtureData.password);
      });      
    });  
    
    it("Login with username and password", () => {
        homeObj.verifyHomePage().should("have.text","Accounts Overview");
    })

    it("Verify the account ",() => {     
      homeObj.verifyAccount().should("have.text","16896");
    })

    it("Verify billpayment page", () =>{
      homeObj.clickBillpayLink();
      billObj.verifyBillPaymentPageTitle().should("have.text","Bill Payment Service");
    })
     
  });