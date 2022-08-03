const {
    testRoomUrl,
    userNameField,
    userNameLabel,
    participant1,
    participant2,
    readyToJoinHeader,
    submitButton,
    joinCallButton,
    peopleButton,
    sideTabButton, 
    onePersonInCallLabel,
    participant1InCall
} = require("./testUtils/selectors");

const {
    ownerPassword, 
    ownerUserName, 
    loginUrl,
} = require("./testUtils/credentials");

module.exports = {

    "@tags": ["test"],
    "Daily join video call toy test"(browser) {
        browser
        .useXpath()
        .url(testRoomUrl)
        .pause(5000)
        .waitForElementVisible(userNameLabel, 5000, "Successfully navigated to the video call room page")
        //enter user name and submit
        .setValue(userNameField, participant1)
        .click(submitButton)
        //wait for the page to load and click on "Join call"
        .waitForElementVisible(readyToJoinHeader, 2000, "Successfully navigated to camera check and prepare to join page")
        .click(joinCallButton)
        .pause(10000)
        .click(peopleButton)
        .waitForElementVisible(sideTabButton, 2000, "Verified that People button is loaded")
        .verify.elementPresent(onePersonInCallLabel, "One person in call notation is present. Verified that one person joined the call")
        .assert.elementPresent(participant1InCall, "Participant 1 successfully joined the call")
    }

};