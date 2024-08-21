#! /usr/bin/env node
const { Client } = require("pg");
require('dotenv').config();

const SQL = `
DROP TABLE trainer_has;
DROP TABLE trainers;
DROP TABLE pokemon;
DROP TABLE regions;
`;

async function main() {
    console.log("clearing...");
    const client = new Client({
      connectionString: `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOSTNAME}:${process.env.PORT}/${process.env.DATABASE}`
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();
//To run script to populate db, run "node db/cleardb.js" in home directory (Should only be ran once)