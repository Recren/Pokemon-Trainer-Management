const {Router} = require("express")
const db = require("../db/queries")

const trainerRouter = Router()

//Route to display a certain trainers information
trainerRouter.get("/:trainer_id", async (req, res) =>{
    const trainer_id = req.params.trainer_id
    const trainerInfo = await db.getTrainerInfo(trainer_id)
    const trainerTeams = await db.getTrainerTeams(trainer_id)
    //console.log(trainerInfo)
    res.render("view-trainer-information", {trainerInfo: trainerInfo, trainerTeams: trainerTeams})
})

module.exports = (
    trainerRouter
)