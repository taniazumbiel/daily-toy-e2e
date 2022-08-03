const {
    ownerPassword, ownerUserName, loginUrl,
} = require("../../e2e-test/tests/testUtils/credentials");
const {
    loginButton, userEmailInput, passwordInput,
} = require("../../e2e-test/tests/testUtils/selectors");
module.exports = {
    url: loginUrl,
    commands: [
        {login() {
            return this.useXpath().setValue(userEmailInput, ownerUserName)
            .setValue(passwordInput, ownerPassword)
            .click(loginButton)
        },
    },
    ],
       
}
