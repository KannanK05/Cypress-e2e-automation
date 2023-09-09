describe("Petstore request", () => {
    const BASE_URL = "https://petstore.swagger.io/v2";
  
    beforeEach(function() {
      cy.fixture("createUserBody").then(json => {
        this.user = json;
      });
    });
  
    it("Print values form fixture", function() {
      cy.log(this.user);
      cy.log(this.user.username);
      cy.log(this.user.password);
    });
  
    it("Create user with request and fixture", function() {
      cy.fixture("createUserBody").then(json => {
        cy.request("POST", `${BASE_URL}/user`, json).then(resp => {
          expect(resp.status).to.eq(200);
        });
      });
    });
  
    it("Login with username and password ", function() {
      const option = {
        method: "GET",
        url: `${BASE_URL}/user/login`,
        qs: `login?username=${this.user.username}&password=${this.user.password}`
      };
      cy.request(option).as("resp");
      cy.get("@resp").should(response => {
        expect(response.status).to.eq(200);
        expect(response).to.have.property("headers");
        
      });
      cy.log("@resp");
    });
  });