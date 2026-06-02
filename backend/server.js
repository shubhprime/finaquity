import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection and initialize tables
async function initDb() {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL successfully!");
    
    // Create News table
    await client.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        source TEXT NOT NULL,
        time TEXT NOT NULL,
        sentiment TEXT NOT NULL
      );
    `);

    // Create Stock Reports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS stock_reports (
        id SERIAL PRIMARY KEY,
        symbol TEXT NOT NULL,
        type TEXT NOT NULL,
        entry TEXT NOT NULL,
        target TEXT NOT NULL,
        stop_loss TEXT NOT NULL,
        note TEXT,
        date TEXT NOT NULL
      );
    `);

    // Seed tables if empty
    const newsCheck = await client.query("SELECT COUNT(*) FROM news;");
    if (parseInt(newsCheck.rows[0].count) === 0) {
      console.log("Seeding news data...");
      const mockNews = [
        { title: "Nifty hits record high of 23,450 led by IT and Banking rally.", source: "Reuters", time: "10 mins ago", sentiment: "Bullish" },
        { title: "Reliance Industries announces expansion plan into green hydrogen storage.", source: "Bloomberg", time: "45 mins ago", sentiment: "Bullish" },
        { title: "Global oil prices fall 1.8% on OPEC supply forecasting updates.", source: "FT", time: "2 hours ago", sentiment: "Neutral" },
        { title: "IT major announces quarterly results beating market consensus by 4%.", source: "CNBC", time: "4 hours ago", sentiment: "Bullish" }
      ];
      for (const item of mockNews) {
        await client.query("INSERT INTO news (title, source, time, sentiment) VALUES ($1, $2, $3, $4);", [
          item.title, item.source, item.time, item.sentiment
        ]);
      }
    }

    const stockCheck = await client.query("SELECT COUNT(*) FROM stock_reports;");
    if (parseInt(stockCheck.rows[0].count) === 0) {
      console.log("Seeding stock reports data...");
      const mockStocks = [
        { symbol: "TATA MOTORS", type: "Swing Buy", entry: "₹970 - ₹980", target: "₹1080", stop_loss: "₹940", note: "Strong momentum on EV order updates.", date: "Today" },
        { symbol: "RELIANCE", type: "Positional Buy", entry: "₹2930 - ₹2945", target: "₹3200", stop_loss: "₹2850", note: "Consolidating near 50 DMA support. Expecting breakout.", date: "Yesterday" }
      ];
      for (const item of mockStocks) {
        await client.query("INSERT INTO stock_reports (symbol, type, entry, target, stop_loss, note, date) VALUES ($1, $2, $3, $4, $5, $6, $7);", [
          item.symbol, item.type, item.entry, item.target, item.stop_loss, item.note, item.date
        ]);
      }
    }

    client.release();
    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Database connection/initialization error: ", err);
  }
}

initDb();

// API Endpoints
app.get('/api/news', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM news ORDER BY id DESC;");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/news', async (req, res) => {
  const { title, source, time, sentiment } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO news (title, source, time, sentiment) VALUES ($1, $2, $3, $4) RETURNING *;",
      [title, source, time, sentiment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stocks', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stock_reports ORDER BY id DESC;");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/stocks', async (req, res) => {
  const { symbol, type, entry, target, stop_loss, note, date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO stock_reports (symbol, type, entry, target, stop_loss, note, date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [symbol, type, entry, target, stop_loss, note, date || 'Today']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
