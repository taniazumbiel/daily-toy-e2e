const {
  assetHealthGraph,
  totalAlarmsGraph,
  logInButton,
  onlineAssetIcon,
  offlineAssetIcon,
  troubleAssetIcon,
  degradedAssetStatusIcon,
  goodAssetStatusIcon,
  deploymentsMenuItem,
  scriptsMenuItem,
  activityMenuItem,
  settingsMenuItem,
  testAssetStatic,
  addButton,
  powerButton,
  exportButton,
  assetEditButton,
  terminalButton,
  //customerFilterField,
  assetEditCheckBox,
  paginationLinkOne,
  paginationLinkTwo,
  deleteUserLink,
  saveButton,
  assetDeployments,
  addNewDeploymentButton,
  refreshButton,
  assetManufacturer,
  autoRefreshButton,
  assetFilterName,
  assetLookupAlarmNumberField,
  assetLookupNameField,
  testDeployment,
  openAlarmState,
  //totalDevicesCount,
  runScriptsButton,
  runDeploymentsButton,
  executeScriptButton,
  tempAccessTab,
  deploymentsTab,
  scriptsTab,
  assetLookupSearchIcon,
  alarmSummaryIcon,
  resolvedAlarmState,
  alarmsPageHeader,
  automationMenuItem,
  //assetsPageHeader,
} = require("./testUtils/selectors");
const { pageUrl } = require("./testUtils/credentials");
const { /*customerName,*/ testDevice } = require("./testUtils/varSelectors");
// eslint-disable-next-line no-undef
module.exports = {
  before: function (browser) {
    browser.page.access["login"]().navigate().setAdminUsername().setPassword();
    browser.click(logInButton);
  },
  after: function (browser) {
    browser.end();
  },
  "@tags": ["e2e"],
  "EMM/CBM automated testing - basic functional sanity checks": (browser) => {
    const pageLogout = browser.page.access["logout"]();
    const devices = browser.page.assets["devicesCountCheck"]();
    const pageTitles = browser.page.verify["pageTitles"]();
    const bulkEdit = browser.page.assets["bulkFilterCheck"]();
    const filters = browser.page.filters["filterCheck"]();
    const alarmPageFilters = browser.page.alarms["alarmsFiltersChecks"]();
    const assetDetails = browser.page.assets["asset"]();
    const addTempAccess = browser.page.verify["tempAccess"]();
    const scriptPage = browser.page.add["script"]();
    const screenshotsPage = browser.page.verify["screenshotsPage"]();
    const distributionsPage = browser.page.verify["distributionsPage"]();
    const deployment = browser.page.add["deployment"]();
    const automationPage = browser.page.verify["automationPage"]();

    let firstPageItem;
    let openAlarmsCount;
    //let beforeNavAway;

    browser
      .useXpath()
      .pause(1000)
      .verify.elementPresent(
        assetHealthGraph,
        "Successfully logged into the platform"
      )
      .verify.elementPresent(totalAlarmsGraph, "Total alarms graph is loaded")
      .verify.elementPresent(onlineAssetIcon, "Online assets are displayed")
      .verify.elementPresent(offlineAssetIcon, "Offline assets are displayed")
      .verify.elementPresent(troubleAssetIcon, "Trouble assets are displayed")
      .verify.elementPresent(
        autoRefreshButton,
        "Refresh button is present on overview page"
      )
      .waitForElementVisible(
        alarmSummaryIcon,
        1000,
        false,
        "Alarm summary icon is displayed"
      )
      .click(alarmSummaryIcon)
      .pause(1000)
      .verify.not.elementPresent(
        resolvedAlarmState,
        "No resolved alarms are displayed on the alarm summary page"
      )
      .back()
      .pause(2000);

    devices.getOfflineAssets().getOnlineAssets().getTotalDeviceCount();
    pageTitles.verifyPageTitles();
    distributionsPage
      .navigate()
      .navigateToDistributions()
      .verifyElementsLoaded();

    browser
      .url(pageUrl)
      //admin user privilege and e2e check
      .verify.elementPresent(
        deploymentsMenuItem,
        "Confirmed: admin users have a link to deployments"
      )
      .verify.elementPresent(
        scriptsMenuItem,
        "Confirmed: admin users have a link to scripts"
      )
      .verify.elementPresent(
        activityMenuItem,
        "Confirmed: admin users have a link to user activity log"
      )
      .verify.elementPresent(
        settingsMenuItem,
        "admin users have a link to alarms settings"
      )
      .verify.elementPresent(
        automationMenuItem,
        "admin users have a link to automation/rule engine"
      )
      .verify.elementPresent(
        autoRefreshButton,
        "Refresh button is present on dashboard"
      )

      .url(`${pageUrl}deployments`)
      .verify.urlContains(
        "deployments",
        "admin users have access to deployments page"
      )
      .verify.elementPresent(
        autoRefreshButton,
        "Refresh button is present on deployments page"
      )
      .verify.elementPresent(
        paginationLinkOne,
        "Pagination is displayed on the deployments page"
      )
      .click(addNewDeploymentButton)
      .waitForElementVisible(
        addButton,
        9000,
        false,
        "Add deployment page is successfully loaded"
      )
      .assert.urlContains("add", "Add deployment URL is correct")
      .click(addButton)
      .click(saveButton)
      .waitForElementPresent(
        `//span[contains(text(),'Please select an instruction')]`,
        1000,
        false,
        "Deployment missed instructions validation is present"
      );
    deployment.addDeploymentInstructions();
    browser
      .click(saveButton)
      .verify.not.elementPresent(
        `//span[contains(text(),'Please select an instruction')]`,
        "Validation error resolved after instructions added"
      )
      .url(`${pageUrl}deployments`)
      .pause(3000)
      .click(testDeployment)
      .waitForElementPresent(
        `//span[contains(text(), "Total Runs")]`,
        1000,
        false,
        "Deployment package page is loaded"
      )
      .pause(2000)
      .url(`${pageUrl}deployments`)
      .pause(3000)
      .click(assetDeployments)
      .waitForElementPresent(
        `//th[contains(text(),'Scheduled Time')]`,
        1000,
        false,
        "Asset deployments page is loaded"
      )
      .pause(2000)
      .url(`${pageUrl}custom-scripts`)
      .verify.urlContains("scripts", "admin users have access to scripts page")
      .verify.elementPresent(
        autoRefreshButton,
        "Refresh button is present on scripts page"
      )
      .verify.elementPresent(
        paginationLinkOne,
        "Pagination is displayed on the scripts page"
      )
      .verify.elementPresent(
        executeScriptButton,
        "Execute script button is present on the scripts page"
      );

    scriptPage.verifyAddScriptPageElements().verifyUnableToSaveEmptyScript();

    screenshotsPage
      .navigate()
      .verifyPageLoaded()
      .verifyAlarmTilesPresent()
      .verifyMainElementsPresent();
    browser.verify.elementPresent(
      paginationLinkOne,
      "Pagination is displayed on the screenshots page"
    );
    filters.customerFilterCheck().locationFilterCheck();
    screenshotsPage.verifyAssetLinksWork();

    browser
      .url(`${pageUrl}assets`)
      .click(testAssetStatic)
      .useCss()
      .pause(2000)
      .verify.elementPresent(
        powerButton,
        "admin has access to asset power button"
      )

      .verify.elementPresent(
        assetEditButton,
        "admin has access to asset edit button"
      )
      .verify.elementPresent(exportButton, "admin has access to asset export")
      .verify.elementPresent(
        terminalButton,
        "admin has access to asset terminal"
      )
      .click(exportButton)
      .useXpath()
      .click(`//span[contains(text(),'Yes')]`)
      .verify.elementPresent(
        `//p[contains(text(),'Email address is required')]`,
        "Email field validation for data download is present"
      )
      .verify.elementPresent(
        `//p[@id='startDate-helper-text']`,
        "Date validation is present"
      )

      .url(`${pageUrl}assets`)
      .click(testAssetStatic);

    //checking asset tabs are loading and refresh button is active and functioning
    browser
      .click(`//span[contains(text(),'System Info')]`)
      .click(refreshButton)
      .verify.not.elementPresent(
        assetManufacturer,
        "Clicked on System info refresh and page is reloading"
      )
      .pause(2000)
      .waitForElementPresent(
        assetManufacturer,
        3000,
        false,
        "Page refresh works"
      );

    assetDetails.verifyTabsContentPresent();

    //asset deployments and scripts page
    browser
      .pause(2000)
      .url(`${pageUrl}assets`)
      .click(testAssetStatic)
      .click(deploymentsTab)
      .pause(1000)
      .verify.elementPresent(
        runDeploymentsButton,
        "admin has access to asset page deployment management"
      )
      .verify.elementPresent(
        autoRefreshButton,
        "Refresh button is present on asset details deployments page"
      );

    //browser.expect.element(cancelDeploymentScript).to.not.be.enabled;
    browser
      .url(`${pageUrl}assets`)
      .click(testAssetStatic)
      .click(scriptsTab)
      .waitForElementPresent(
        runScriptsButton,
        2000,
        false,
        "Admin has access to asset page scripts management"
      )
      .waitForElementPresent(
        autoRefreshButton,
        2000,
        false,
        "Refresh button is present on asset details scripts page"
      );
    //browser.expect.element(cancelDeploymentScript).to.not.be.enabled;
    browser
      .url(`${pageUrl}assets`)
      .pause(1000)
      .verify.elementPresent(
        assetEditCheckBox,
        "admin has access to device bulk edit"
      )
      .verify.elementPresent(
        autoRefreshButton,
        "Refresh button is present on assets page"
      );

    bulkEdit.bulkEditControlsCheck();

    browser
      .click(onlineAssetIcon)
      .pause(2000)
      .verify.not.elementPresent(
        degradedAssetStatusIcon,
        "Offline degraded assets are not present on the page when online filter is on"
      )
      .click(onlineAssetIcon)
      .pause(2000)
      .click(offlineAssetIcon)
      .pause(2000)
      .verify.not.elementPresent(
        goodAssetStatusIcon,
        "Online good status assets are not present on the page when offline filter is on"
      )
      .click(offlineAssetIcon)
      .pause(2000)
      .click(troubleAssetIcon)
      .pause(2000)
      .verify.not.elementPresent(
        goodAssetStatusIcon,
        "Online good status assets are not present on the page when trouble filter is on"
      )
      .verify.not.elementPresent(
        degradedAssetStatusIcon,
        "Offline degraded assets are not present on the page when trouble filter is on"
      )
      .click(troubleAssetIcon);

    // browser
    //   .click(customerFilterField)
    //   .click(`//li[contains(text(),"${customerName}")]`)
    //   .waitForElementVisible(
    //     `//td[contains(text(),"${customerName}")]`,
    //     3000,
    //     false,
    //     "Location filter applied"
    //   )
    //   .getText(totalDevicesCount, (result) => {
    //     beforeNavAway = result.value;
    //   })
    //   .click(testAssetStatic)
    //   .pause(1000)
    //   .back()
    //   .waitForElementVisible(
    //   `//td[contains(text(),"${customerName}")]`,
    //   2000,
    //   false,
    //   "Returned to previous page"
    // )
    // .pause(3000)
    // .getText(totalDevicesCount, (result) => {
    //   const afterNavAway = result.value;
    //   browser.verify.equal(
    //     beforeNavAway,
    //     afterNavAway,
    //     "Total amount of assets remains the same after navigating away and returning back"
    //   );
    // });

    filters.customerFilterCheck().locationFilterCheck();

    //alarms page filters checks
    browser.url(`${pageUrl}alarms`);
    alarmPageFilters
      .verifyPageLoaded()
      .verifyCorrectAssetReturned()
      .checkSeverityErrorFilter()
      .checkSeverityWarningCriticalFilter();

    //alarms pagination checks
    browser
      .url(`${pageUrl}alarms`)
      .pause(2000)
      .useXpath()
      .getText(`//tr[1]//td[5]`, function (result) {
        firstPageItem = result.value;
      })
      .pause(2000)
      .click(paginationLinkTwo)
      .pause(6000)
      .waitForElementVisible(
        alarmsPageHeader,
        2000,
        false,
        "Second alarms page is loaded"
      )
      .getText(`//tr[1]//td[5]`, function (result) {
        const secondPageItem = result.value;
        browser.verify.notEqual(
          firstPageItem,
          secondPageItem,
          "Timestamps are different on different pages - pagination works"
        );
      })

      //alarm count and field asset lookup check
      .pause(2000)
      .url(`${pageUrl}alarms`)
      .pause(2000)
      .waitForElementVisible(
        alarmsPageHeader,
        2000,
        false,
        "Alarms page is loaded"
      )
      .click(assetFilterName)
      .setValue(assetFilterName, testDevice)
      .click(`//li[contains(text(),"${testDevice}")]`)
      .waitForElementVisible(
        `//a[contains(text(), "${testDevice}")]`,
        2000,
        false,
        "Filter applied"
      );
    browser
      .elements("xpath", openAlarmState, (result) => {
        openAlarmsCount = result.value.length;
      })
      .url(`${pageUrl}field/asset-lookup`)
      .waitForElementVisible(
        `//h1[contains(text(),'Condition Based Maintenance')]`,
        2000,
        false,
        "Asset lookup page is loaded"
      )
      .setValue(assetLookupNameField, testDevice)
      .click(assetLookupSearchIcon)
      .pause(4000)
      .getValue(assetLookupAlarmNumberField, (result) => {
        const openAlarmsValue = result.value;
        browser.verify.equal(
          openAlarmsCount,
          openAlarmsValue,
          "Open alarms count is displayed correctly for test asset"
        );
      });

    //user delete link check
    browser
      .url(`${pageUrl}me/edit`)
      .verify.not.elementPresent(
        deleteUserLink,
        "User is unable to delete self - verified"
      )
      .pause(2000)
      .url(`${pageUrl}users`)
      .verify.elementPresent(
        paginationLinkOne,
        "Pagination is displayed on the users page"
      )
      .click(tempAccessTab)
      .pause(2000);
    addTempAccess
      .verifyHasAccess()
      .verifyPageElementsPresent()
      .verifyUnableToSaveEmptyFields()
      .verifyFiltersWork();
    browser.verify
      .elementPresent(
        paginationLinkOne,
        "Pagination is displayed on the add temporary access page"
      )
      .url(`${pageUrl}users/5eda93a31ac8cb00062434c8/edit`)
      .waitForElementPresent(
        saveButton,
        2000,
        false,
        "System administrator (not self) user edit page loaded"
      )
      .verify.elementPresent(
        deleteUserLink,
        "Not-self user can be deleted - verified"
      );

    //automation page checks
    browser.click(automationMenuItem);
    automationPage
      .verifyPageLoaded()
      .verifyElementsLoaded()
      .addNewAutomation()
      .verifyRulePageElementsPresent()
      .verifyFieldValidation();

    pageLogout.logout();
  },
};