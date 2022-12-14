
module.exports = {
  src_folders: ["e2e-test/tests"],
  
  log_screenshot_data: true,
  test_workers: {
    enabled: true,
    workers: "auto",
  },

  webdriver: {
    start_process: true,
    timeout_options: { timeout: 15000, retry_attempts: 6 },
    status_poll_interval: 100,
    max_status_poll_tries: 6,
    server_path: "node_modules/.bin/chromedriver",
    port: 9515,
  },

  test_settings: {
    default: {
      screenshots: {
        enabled: false,
        path: "e2e-test/tests_output/screenshots",
      },
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        chromeOptions: {
          args: [
            "--window-size=1920,1080",
            "--start-maximized",
            // **** uncomment the following 3 lines to run tests in headless mode ****
            // "--headless",
            // "--disable-gpu",
            // "no-sandbox",
            "--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"
          ],
        },
        binary: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      },
    },
  },
};