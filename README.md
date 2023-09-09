# Cypress-e2e-automation


Step by step guide to start E2E automation with Cypress.

Create a user in parabank.parasoft.com, which is a bank demo website.

## Getting Started

Create a user in parabank.parasoft.com, which is a bank demo website.

For the request test examples, I will use this server documented in swagger: https://petstore.swagger.io/#/

Create a project and run the  next commands:

```
1. npm init
2. npm install cypress --save-dev
3. ./node_modules/.bin/cypress open

```

In the step 1, you will create the package.json file and the step 2 adds cypress as development dependency to package.json. In the step 3, the cypress will open and you will see the Cypress Test Runner and a new folder in the repo so-called cypress.

Add these two scripts to package.json:

```
"scripts": {
    "test:chrome": "cypress run -- browser chrome",
    "test:edge": "cypress run --browser edge",
    "test:parallel":"npm-run-all test:chrome test:edge"
  }
```

Cypress:open will run the Test Run while cypress:run runs in the terminal.



### Start writing E2E Automation

### Cypress write first test using cy.visit()

Add the baseUrl value to the cypress.json configuration file.

```
{
    "baseUrl": "https://parabank.parasoft.com"
}
```

Cypress folder will have the next folders:

```
fixtures
e2e
plugins
support

```

Create a new folder called Login within e2e and add a new test script so-called login.spec.js

Write the first two test to see the website Parabank.

```
describe("Login Parabank", () => {
  it("Visit the website", () => {
    cy.visit("https://parabank.parasoft.com/parabank/index.htm");
  });

  it("Visit the website using baseUrl", () => {
    cy.visit("/");
  });
});

```

In the first test the url is passed as string while in the second the url is fetch fron the value baseUrl in the cypress.json

To run the test write in the terminal:

```
npm run cypress:open
```

![Alt text](picture/CypressTestRunner.png?raw=true "Title")

Double-click the login.spec.js and run the test:

![Alt text](picture/Cypress_cyvisit.png?raw=true "Title")

### Cypress write first test using cy.get()

The next test will be to login with username and password. You can use the target icon beside the url in the picture above to fetch the username textbox attribute.

That´s the result for user name: cy.get(':nth-child(2) > .input')

The test looks like this:

```
it("Login with username and password", () => {
    cy.get(':nth-child(2) > .input').type('pedroR')
    cy.get(':nth-child(4) > .input').type('87654321')
    cy.get(':nth-child(5) > .button').click()
  })
```

![Alt text](picture/Cypress_cyget.png?raw=true "Title")

### Cypress write first test using cy.request(), cy.fixture() and Alias

The request method plays an important role in order to control the state of the web and avoid overusing the UI elemetns. For instance, if the test login with username and password was positive, for the next scenarios you can bypass the UI and control the state of your web by using request instead. 

Fixture is a json data file under the fixtures folder. It can be access with cy.fixture() as in the example below in the beforeEach(). 

Note: this test context object will not work if you use arrow functions. 

```
describe("Petstore request", () => {
  const BASE_URL = "https://petstore.swagger.io/v2";

  beforeEach(function() {
    cy.fixture("createUserBody").then(json => {
      this.user = json;
    });
  });
```
In this test, I just cy.log() the fixture that was fetch in the beforeEach(). 

```
  it("Print values form fixture", function() {
    cy.log(this.user);
    cy.log(this.user.username);
    cy.log(this.user.password);
  });
```

If your critical path to create a new user through the web works for the next scenario use cy.request(). In the example below, I am not accessing the this.user object but fetching the fixture once again. I know it is overkilling! Then, I assert the response code. 

```
  it("Create user with request and fixture", function() {
    cy.fixture("createUserBody").then(json => {
      cy.request("POST", `${BASE_URL}/user`, json).then(resp => {
        expect(resp.status).to.eq(200);
      });
    });
  });
```

In this test, I use the cy.request() again but I create an Alias .as("resp") which can be manipulated later on for assertions or something else. 

```
  it("Login with username and passwork ", function() {
    const option = {
      method: "GET",
      url: `${BASE_URL}/user/login`,
      qs: `login?username=${this.user.username}&password=${this.user.password}`
    };
    cy.request(option).as("resp");
    cy.get("@resp").should(response => {
      expect(response).to.have.property("headers");
    });
  });
});
```

## Run Cypress with Docker

In the ci folder you wil find the Dockerfile to build the docker image.

```
FROM cypress/included:3.2.0
MAINTAINER David Bartolome
ADD ./ E2E-Automation-Cypress
WORKDIR E2E-Automation-Cypress
RUN npm i
CMD ["npm","run","cypress:run"]

```

Run the commands below in your terminal to build the image.

```
docker build --rm -t cypress:1 -f ci/Dockerfile .
```

If the terminal shows "Successfully tagged cypress:1", then you are ready to run the container with this command:

```
docker run -it cypress:1
```

This is the result after running the container:

![Alt text](picture/Cypress_Dockerfile.png?raw=true "Title")

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Versioning

## Authors

- **Kannan Kaleeswaran** - _Automation Test Engineer_ -

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
