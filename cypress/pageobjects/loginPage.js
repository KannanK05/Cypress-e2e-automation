class loginPage{
    elements = { 
        usernameInput : () => cy.get(':nth-child(2) > .input'),      
        passwordInput : () => cy.get(':nth-child(4) > .input'),    
        loginBtn : () => cy.get(':nth-child(5) > .button')
        //successTxt : () => cy.get('h3'),
        //errorTxt : () => cy.get('span')
    }

    enterUsername(username)
   {
       this.elements.usernameInput().clear();
       this.elements.usernameInput().type(username);
   }

   enterPassword(password)
   {
       this.elements.passwordInput().clear();
       this.elements.passwordInput().type(password);
   }
  
   clickSubmit() {
       this.elements.loginBtn().click();
   }

   loginApp(username,password){
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickSubmit();

   }

}

export default loginPage;