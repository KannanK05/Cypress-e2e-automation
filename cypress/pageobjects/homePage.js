class homePage{

    elements ={
        homeText : () => cy.get('.title'),
        accountText : () => cy.get('.ng-scope > :nth-child(1) > .ng-binding'),
        billpayLink : () => cy.get('#leftPanel > ul > :nth-child(4) > a')
    }

    verifyHomePage(){
        return this.elements.homeText();
    }

    verifyAccount(){
       return this.elements.accountText();
    }

    clickBillpayLink(){
        this.elements.billpayLink().click();
    }

}
export default homePage;