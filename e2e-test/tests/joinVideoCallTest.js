const {

} = require("./testUtils/selectors");

module.exports = {

    "@tags": ["join"],
    "Daily join video call toy test": (browser) => {
        const login = browser.page.access["login"]();
        login.navigate().login();
    }

};