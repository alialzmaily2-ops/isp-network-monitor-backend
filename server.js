import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.json({
    service: "ISP Network Monitor Backend",
    status: "running"
  });
});

// مثال مهمة كل 30 ثانية
cron.schedule("*/30 * * * * *", async () => {
  console.log("Running scheduled discovery...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
