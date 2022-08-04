const {
    testRoomUrl,
    userNameField,
    userNameLabel,
    participant1,
    readyToJoinHeader,
    submitButton,
    joinCallButton,
    peopleButton,
    sideTabButton, 
    onePersonInCallLabel,
    twoPeopleInCallLabel,
    participant1InCall,
    participant2InCall,
    waitingForOthersToJoin,
    leaveCallButton
} = require("./testUtils/selectors");

module.exports = {

    "@tags": ["test"],
    "DTwo participants video call e2e toy test"(browser) {

        // *** FIRST PARTICIPANT JOINS THE CALL ***  

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
        .pause(3000)
        .click(peopleButton)
        .waitForElementVisible(sideTabButton, 2000, "Verified that side tab is loaded")
        .verify.elementPresent(onePersonInCallLabel, "One person in call notation is present. Verified that one person joined the call")
        .verify.elementPresent(waitingForOthersToJoin, "Waiting for others to join is present")
        .verify.elementPresent(leaveCallButton, "Leave call button appears")
        .assert.elementPresent(participant1InCall, "Participant 1 successfully joined the call")

        // *** SECOND PARTICIPANT JOINS THE CALL ***

        //open a new window and navigate to the call room
        browser.openNewWindow('window')

            browser.windowHandles = async function (browser) {
                const result = await browser.windowHandles();
                var handle = result.value[1];
                browser.switchToWindow(handle);
              };
            browser.url(testRoomUrl)
        .pause(5000)
        .waitForElementVisible(readyToJoinHeader, 2000, "Successfully navigated to camera check and prepare to join page")
        .click(joinCallButton)
        .pause(3000)
        .click(peopleButton) 
        .waitForElementVisible(sideTabButton, 2000, "Verified that side tab is loaded")
        .verify.not.elementPresent(waitingForOthersToJoin, "Waiting for others to join disappeared when the second person joined")
        .verify.elementPresent(twoPeopleInCallLabel, "Two people in call notation are present. Verified that 2 people joined the call")
        .verify.elementPresent(leaveCallButton, "Leave call button appears")
        .assert.elementPresent(participant1InCall, "Participant 1 successfully joined the call and currently present in participants list") 
        .assert.elementPresent(participant2InCall, "Participant 2 successfully joined the call and currently present in participants list") 
        .end();  
        },
};