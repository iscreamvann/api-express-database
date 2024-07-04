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
router.put('/:id', async (req, res) => {
    console.log("BumbaClap", req.body)
    const update = await db.query(
        `UPDATE books
            SET title = ?,
            type = ?,
            author = ?,
            topic = ?,
            publication_date = ?,
            pages = ?
            WHERE id = ?;
`, [req.body.title, req.body.type, req.body.author, req.body.topic, req.body.publication_date, req.body.pages, req.params.id ])
    const response = await db.query("select * FROM books WHERE id = ? ", [req.params.id])
    res.json({books: response})
})
router.delete('/:id', async (req, res) => {
    const response = await db.query("select * FROM books WHERE id = ? ", [req.params.id])
    await db.query("DELETE FROM books WHERE id = ?", [req.params.id])
    res.json({books: response})
})
router.post('/', async (req, res) => {
    console.log("BumbaClap", req.body)
    const update = await db.query(
        `INSERT INTO books (title, type, author, topic, publication_date, pages)
VALUES (?, ?, ?, ?, ?, ?);
`, [req.body.title, req.body.type, req.body.author, req.body.topic, req.body.publication_date, req.body.pages])
    console.log("test", update.insertId)
const response = await db.query("select * FROM books WHERE id = ? ", [update.insertId])
    res.status(201).json({books: response})
})

module.exports = router
