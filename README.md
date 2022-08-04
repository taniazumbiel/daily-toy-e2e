# Daily toy e2e test

## About:

This project represents an end-to-end test of two participants in a Daily meeting and verifying if both participants were able to join the meeting.
The test simulates a video call of two users in a browser using a prebuilt: one of the participants opens a browser window and joins a call (the call room creation is not the part of this particular test, but this would definitely be a part of overall e2e suit in real life settings), then the second participant opens another browser window and joins the same call as the first one.
When both participants joined the call, the test verifies:
- 2 people are on the call
- two different names are displayed in the participant list
- “Leave the call” button is displayed for both active participants
- "Waiting for others to join” the call header is not shown to both active participants on the call


**Nightwatch.js** was used as a tool to build the tests.
Nightwatch.js is an End-to-End testing solution for web applications and websites, written in Node.js. It uses the W3C WebDriver API to drive browsers and perform commands and assertions on DOM elements.

## How to run Nightwatch tests:

### Prerequisites

Make sure:
-  *[Node](https://nodejs.org/)* is installed on the system. The version used for this project is 14.15.1
- Google Chrome browser is installed and updated to the version 104.0.5112.79 (latest available)


Then clone the repo to your local computer and run 

    npm install

This will install all the packages and dependencies needed for running the tests (Nightwatch and Chromedriver).

To install the Chromedriver manually (in case of any issues, but usually it is unnessesary) run the command:

    npm install chromedriver --chromedriver_version=LATEST --chromedriver-force-download --save-dev

### Running tests   

When everything is installed and you are ready to run the test, open the project in the terminal and run the command

    npm test -- --tag test

This command will automatically start the browser. After all the tests are complete (they all are expected to pass), the following output will be displayed in terminal:

![Passed tests](/img/passed-tests.png)

To run a test that will fail, use the following command:


    npm test -- --tag failed-test


Failed test output will be displayed in terminal and what part failed in particular, will be highlighted:


![Failed tests](/img/failed-test.png)

