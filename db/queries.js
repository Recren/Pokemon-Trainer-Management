const pool = require("./pool");

async function getAllRegions() {
    const { rows } = await pool.query("SELECT * FROM regions");
    return rows
}

async function getTrainersFromRegion(region) {
    const { rows } = await pool.query("SELECT * FROM trainers where region = ($1)", [region]);
    return rows  
}

async function getAllTrainers() {
    const { rows } = await pool.query("SELECT * FROM trainers");
    return rows
}

module.exports = {
    getAllRegions,
    getTrainersFromRegion,
    getAllTrainers
};