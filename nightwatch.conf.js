
module.exports = {
  src_folders: ["e2e-test/tests"],
  page_objects_path: ["e2e-test/page-objects"],
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
            "--headless",
            "--disable-gpu",
            "no-sandbox",
          ],
        },
        binary: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      },
    },
  },
};