const express = require("express");
const path = require("path");
const trainerRouter = require("./Routes/trainerRoutes")
const app = express();

//Allow app to use static assets
app.use(express.static(path.join(__dirname, "public")))


//Setup express to get renders from the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//Tell app to use the routes in trainerRouter
app.use(trainerRouter)

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log("App is running on http://localhost:5000")
})