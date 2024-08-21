const {Pool} = require("pg");

require('dotenv').config();

//Create database connection
module.exports = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOSTNAME,
    database: process.env.DATABASE,
    port: process.env.PORT

})
