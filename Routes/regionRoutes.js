const {Router} = require("express")
const db = require("../db/queries")
const regionRouter = Router();

//Display the homepage with all of the regions
regionRouter.get("/",  async (req, res) =>{
    const regions =  await db.getAllRegions()
    console.log(regions)
    res.render("select-region-page", {regions: regions})
})
//Display the homepage with all trainers in a specific region
regionRouter.get("/:region",  async (req, res) =>{
    const region = req.params.region
    const trainers =  await db.getTrainersFromRegion(region)
    //console.log(trainers)
    res.render("trainer-display-page", {trainers: trainers})
})


module.exports = (
    regionRouter    
)