const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const response = await db.query("select * FROM books", [])
    res.json({response})
})

module.exports = router
