// apps/data-ingestion/index.js
import express from "express";
import bodyParser from "body-parser";
import { saveToDatabase } from "../../packages/shared/db.js";

const app = express();
app.use(bodyParser.json());

// ✅ ตัวรับข้อมูลผ่าน API (POST /ingest)
app.post("/ingest", async (req, res) => {
  try {
    const { source, payload } = req.body;

    if (!source || !payload) {
      return res.status(400).json({ error: "source & payload required" });
    }

    // แปลงข้อมูลให้อยู่ใน schema กลาง
    const normalized = {
      source,
      timestamp: new Date(),
      data: payload,
    };

    await saveToDatabase("ingestions", normalized);

    res.json({ status: "ok", stored: normalized });
  } catch (err) {
    console.error("Ingest error:", err);
    res.status(500).json({ error: "internal error" });
  }
});

// ✅ รัน ingestion server
const PORT = process.env.INGEST_PORT || 5005;
app.listen(PORT, () => {
  console.log(`📥 Data ingestion service running at http://localhost:${PORT}`);
});
