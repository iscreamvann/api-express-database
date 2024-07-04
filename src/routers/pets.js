const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const response = await db.query("select * FROM pets", [])
    res.json({pets: response})
})
router.get('/:id', async (req, res) => {
    const response = await db.query("select * FROM pets WHERE id = ? ", [req.params.id])
    res.json({pets: response})
})
router.put('/:id', async (req, res) => {
    console.log("BumbaClap", req.body)
    const update = await db.query(
        `UPDATE pets
            SET name = ?,
            age = ?,
            type = ?,
            breed = ?,
            has_microchip = ?
            WHERE id = ?;
`, [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.has_microchip, req.params.id ])
    const response = await db.query("select * FROM pets WHERE id = ? ", [req.params.id])
    res.json({pets: response})
})
router.delete('/:id', async (req, res) => {
    const response = await db.query("select * FROM pets WHERE id = ? ", [req.params.id])
    await db.query("DELETE FROM pets WHERE id = ?", [req.params.id])
    res.json({pets: response})
})
router.post('/', async (req, res) => {
    console.log("BumbaClap", req.body)
    const update = await db.query(
        `INSERT INTO pets (name, age, type, breed, has_microchip)
VALUES (?, ?, ?, ?, ?);
`, [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.has_microchip])
    console.log("test", update.insertId)
const response = await db.query("select * FROM pets WHERE id = ? ", [update.insertId])
    res.json({books: response})
})

module.exports = router
