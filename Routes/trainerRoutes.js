const {Router} = require("express")
const db = require("../db/queries")
const trainerRouter = Router();

//Display the homepage with all trainers
trainerRouter.get("/",  async (req, res) =>{
    const trainers =  await db.getAllTrainers()
    console.log(trainers)
    res.render("homepage", {trainers: trainers})
})

module.exports = (
    trainerRouter
)