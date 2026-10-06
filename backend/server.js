const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = 3000;

const path = require("path");

app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

const gamesRouter = require("./routes/games");

app.use("/api/games", gamesRouter);

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            status: "OK",
            message: "CE ARENA backend and database are connected!",
            database_time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "ERROR",
            message: "Database connection failed"
        });
    }
});

app.listen(PORT, () => {
    console.log(`CE ARENA server running on http://localhost:${PORT}`);
});
