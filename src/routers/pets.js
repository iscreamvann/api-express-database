const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const response = await db.query("select * FROM pets", [])
    res.json({pets: response.map(parsePet)})
})
router.get('/:id', async (req, res) => {
    const response = await db.query("select * FROM pets WHERE id = ? ", [req.params.id])
    res.json({pet: parsePet(response[0])})
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
    res.json({pet: parsePet(response[0])})
})
router.delete('/:id', async (req, res) => {
    const response = await db.query("select * FROM pets WHERE id = ? ", [req.params.id])
    await db.query("DELETE FROM pets WHERE id = ?", [req.params.id])
    res.json({pet: parsePet(response[0])})
})
router.post('/', async (req, res) => {
    console.log("BumbaClap", req.body)
    const update = await db.query(
        `INSERT INTO pets (name, age, type, breed, has_microchip)
VALUES (?, ?, ?, ?, ?);
`, [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.has_microchip])
    console.log("test", update.insertId)
const response = await db.query("select * FROM pets WHERE id = ? ", [update.insertId])
    res.status(201).json({pet: parsePet(response[0])})
})

function parsePet(data) {
    return {...data, has_microchip: !!data.has_microchip}
}

module.exports = router
