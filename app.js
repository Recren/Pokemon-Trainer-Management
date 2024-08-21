const express = require("express");
const path = require("path");
const regionRouter = require("./Routes/regionRoutes")
const app = express();

//Allow app to use static assets
app.use(express.static(path.join(__dirname, "public")))


//Setup express to get renders from the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//Tell app to use the routes 
app.use('/regions', regionRouter)

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log("App is running on http://localhost:5000/regions")
})