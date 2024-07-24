import { Hono } from "hono";
import { logger } from "hono/logger";
import puppeteer from "puppeteer";
import { siteRoute } from "./routes/site";
import { userRoute } from "./routes/user";

export const app = new Hono();

// middleware
app.use("*", logger());

app.post("/api/take", async (c) => {
  const { url } = await c.req.json();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Navigate to the provided URL
  await page.goto(url, { waitUntil: "networkidle2" });
  // Take a screenshot
  const screenshot = await page.screenshot({});
  // Close the browser
  await browser.close();
  // Return the screenshot as a base64 string
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([screenshot], { type: "image/png" }),
    "screenshot.png"
  );
  console.log(formData);
  return c.json({ screenshot: screenshot });
});

// rotues
const apiRoutes = app
  .basePath("/api")
  .route("/user", userRoute)
  .route("/sites", siteRoute);

export type AppType = typeof apiRoutes;
