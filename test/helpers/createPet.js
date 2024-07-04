const client = require("../../db");

const createPet = async (values) => {
  const sqlString = `INSERT INTO "pets" (name, age, type, breed, has_microchip) VALUES (?, ?, ?, ?, ?);`

  const result = await client.query(sqlString, values)

  return result.rows[0]
}

module.exports = createPet
