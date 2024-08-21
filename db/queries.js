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

async function getTrainerInfo(trainer_id){
    const { rows } = await pool.query("SELECT * FROM trainers where trainer_id = ($1)", [trainer_id]);
    return rows[0]  
}
async function getTrainerTeams(trainer_id){
    const { rows } = await pool.query("SELECT * FROM trainer_has where trainer_id = ($1)", [trainer_id]);
    return rows
}

async function postNewTrainer(name, region_name){
    await pool.query("INSERT INTO trainers (name, region) VALUES (($1), ($2))", [name, region_name])
}
module.exports = {
    getAllRegions,
    getTrainersFromRegion,
    getAllTrainers,
    getTrainerInfo,
    getTrainerTeams,
    postNewTrainer
};