# Daily toy e2e test

## About:

This project represents an end-to-end test of two participants in a Daily meeting and verifying if both participants were able to join the meeting.  
The test simulates a video call of two users in a browser using a prebuilt: one of the participants opens a browser window and joins a call (the call room creation is not the part of this particular test, but this would definitely be a part of overall e2e suit in real life settings), then the second participant opens another browser window and joins the same call as the first one.
When both participants joined the call, the test verifies:
- 2 people are on the call
- two different names are displayed in the participant list 
- “Leave the call” button is displayed for both active participants 
- "Waiting for others to join” the call header is not shown to both active participants on the call


Nightwatch.js was used as a tool to build the tests.
Nightwatch.js is an End-to-End testing solution for web applications and websites, written in Node.js. It uses the W3C WebDriver API to drive browsers and perform commands and assertions on DOM elements. 
