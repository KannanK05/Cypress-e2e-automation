class BillPaymentPage{

    elements = {
        pageTitle : () => cy.get('[ng-show="showForm"] > .title')
    }

    verifyBillPaymentPageTitle(){
       return  this.elements.pageTitle();
    }
}

export default BillPaymentPage;