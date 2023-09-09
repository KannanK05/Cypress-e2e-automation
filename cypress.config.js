

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://parabank.parasoft.com",
    reporter:"mochawesome",
    reporterOptions:{
       reportDir:"cypress/reports",
       overwrite:"false",
       html:true,
       json:true

    }
  },
  
    
  
});


