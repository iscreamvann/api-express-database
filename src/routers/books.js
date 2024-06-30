const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const response = await db.query("select * FROM books", [])
    res.json({books: response})
})
router.get('/:id', async (req, res) => {
    const response = await db.query("select * FROM books WHERE id = ? ", [req.params.id])
    res.json({books: response})
})

module.exports = router
