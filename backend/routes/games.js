const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM games ORDER BY id ASC"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch games"
        });
    }
});

module.exports = router;
