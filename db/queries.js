const pool = require("./pool");

async function getAllTrainers() {
    const { rows } = await pool.query("SELECT * FROM trainer");
    return rows
}

module.exports = {
    getAllTrainers
};