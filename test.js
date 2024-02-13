const { remote } = require("webdriverio");

(async () => {
  const browser = await remote({
    // We use a custom port--the one CD runs on,
    // otherwise the CDT protocol will be used by default
    port: 9515,
    logLevel: "trace",
    capabilities: {
      browserName: "chrome"
    }
  })

  await browser.url("https://duckduckgo.com")

  const inputElem = await browser.$("#searchbox_input")
  await inputElem.setValue("WebdriverIO")

  const submitBtn = await browser.$("[type='submit']")
  await submitBtn.click()

  // outputs: "Title is: WebdriverIO at DuckDuckGo"
  console.log(await browser.getTitle())

  // ending the session at the end of the test
  await browser.deleteSession()
})().catch((e) => console.error(e))
