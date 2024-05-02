// const express = require("express");
// const cors = require("cors");
// const requestPromise = require("request-promise");
// const cheerio = require("cheerio");

// const app = express();
// app.use(cors());

// app.get("/", async (req, res) => {
//   try {
//     const today = new Date().toISOString().split("T")[0];
//     const dateFilter = req.query.date || today;
//     // Log date filter to check if it's received correctly

//     const url = `https://www.nbc.gov.kh/english/economic_research/exchange_rate.php?datepicker=${dateFilter}`;

//     const html = await requestPromise(url);
//     const $ = cheerio.load(html);

//     const exchangeRates = [];

//     $("table.tbl-responsive tr").each((index, element) => {
//       if (index > 0) {
//         const columns = $(element).find("td");
//         const currency = columns.eq(0).text().trim();
//         const Symbol = columns.eq(1).text().trim();
//         const unit = columns.eq(2).text().trim();
//         const bid = columns.eq(3).text().trim();
//         const ask = columns.eq(4).text().trim();

//         exchangeRates.push({ currency, Symbol, unit, bid, ask });
//       }
//     });

//     const officialExchangeRateRow = $('td:contains("Official Exchange Rate")');
//     const officialExchangeRateText = officialExchangeRateRow.text();
//     const officialExchangeRateMatch = officialExchangeRateText.match(/(\d+)/);
//     const officialExchangeRate = officialExchangeRateMatch
//       ? parseInt(officialExchangeRateMatch[1])
//       : null;

//     const response = {
//       ok: true,
//       value: exchangeRates,
//       officialExchangeRate,
//       date: dateFilter,
//     };

//     res.json(response);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// const express = require("express");
// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");
// const cors = require("cors");
// require("dotenv").config();
// const app = express();
// app.use(cors());

// app.get("/", async (req, res) => {
//   try {
//     const dateFilter = req.query.date || "2024-01-26";

//     const browser = await puppeteer.launch({
//       headless: true,
//       args: [
//         "--no-sandbox",
//         "--disable-setuid-sandbox",
//         "--single-process",
//         "--no-zygote",
//       ],
//       executablePath: (process.env.NODE_ENV = "production"
//         ? process.env.PUPEPTEER_EXECUTTABLE_PATH
//         : puppeteer.executablePath()),
//       //   "C:\\Users\\khea\\.cache\\puppeteer\\chrome\\win64-124.0.6367.78\\chrome-win64\\chrome.exe",
//     });

//     const page = await browser.newPage();

//     // Set user agent
//     await page.setUserAgent(
//       "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
//     );

//     // Increase the navigation timeout to 60 seconds (60000 milliseconds)
//     await page.goto(
//       "https://www.nbc.gov.kh/english/economic_research/exchange_rate.php",
//       { timeout: 60000 }
//     );

//     await page.waitForTimeout(2000);

//     await page.$eval(
//       "#datepicker",
//       (datepicker, dateFilter) => {
//         datepicker.value = dateFilter;
//       },
//       dateFilter
//     );

//     await page.click('input[name="view"]');
//     await page.waitForTimeout(2000);

//     const content = await page.content();
//     const $ = cheerio.load(content);

//     const exchangeRates = [];

//     $("table.tbl-responsive tr").each((index, element) => {
//       if (index > 0) {
//         const columns = $(element).find("td");
//         const currency = columns.eq(0).text().trim();
//         const Symbol = columns.eq(1).text().trim();
//         const unit = columns.eq(2).text().trim();
//         const bid = columns.eq(3).text().trim();
//         const ask = columns.eq(4).text().trim();

//         exchangeRates.push({ currency, Symbol, unit, bid, ask });
//       }
//     });

//     const officialExchangeRateRow = $('td:contains("Official Exchange Rate")');
//     const officialExchangeRateText = officialExchangeRateRow.text();
//     const officialExchangeRateMatch = officialExchangeRateText.match(/(\d+)/);
//     const officialExchangeRate = officialExchangeRateMatch
//       ? parseInt(officialExchangeRateMatch[1])
//       : null;

//     await browser.close();

//     const response = {
//       ok: true,
//       value: exchangeRates,
//       officialExchangeRate,
//       date: dateFilter,
//     };

//     res.json(response);
//   } catch (error) {
//     console.error("Error:", error);

//     if (error instanceof puppeteer.errors.TimeoutError) {
//       res.status(500).json({ error: "Timeout Error" });
//     } else {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });