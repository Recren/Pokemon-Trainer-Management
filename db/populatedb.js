#! /usr/bin/env node
const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS pokemon(
	Name varchar(50) NOT NULL PRIMARY KEY,
	Dex_num int NOT NULL UNIQUE,
	Primary_type varchar(20) NOT NULL,
	Secondary_type varchar(20)
);

CREATE TABLE IF NOT EXISTS trainer(
    Trainer_ID SERIAL PRIMARY KEY,
	Name varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS trainer_has(
	Trainer_ID int NOT NULL PRIMARY KEY,
	Pokemon_one varchar(50),
	Pokemon_two varchar(50),
	Pokemon_three varchar(50),
	Pokemon_four varchar(50),
	Pokemon_five varchar(50),
	Pokemon_six varchar(50),
	
	FOREIGN KEY (Trainer_ID) references trainer(Trainer_ID)
		ON DELETE cascade,

	FOREIGN KEY (Pokemon_one) references pokemon(Name)
		ON DELETE Set Null,

	FOREIGN KEY (Pokemon_two) references pokemon(Name)
		ON DELETE Set Null,

	FOREIGN KEY (Pokemon_three) references pokemon(Name)
		ON DELETE Set Null,

	FOREIGN KEY (Pokemon_four) references pokemon(Name)
		ON DELETE Set Null,

	FOREIGN KEY (Pokemon_five) references pokemon(Name)
		ON DELETE Set Null,

	FOREIGN KEY (Pokemon_six) references pokemon(Name)
		ON DELETE Set Null
);


INSERT INTO pokemon (Name, Dex_num, Primary_type, Secondary_type) 
VALUES
  ('Venasaur', '3', 'Grass', 'Poison'),
  ('Charizard', '6', 'Fire', 'Flying'),
  ('Blastoise', '9', 'Water', NULL),
  ('Pikachu', '25', 'Electric', NULL);

INSERT INTO trainer (Name)
VALUES
    ('ASH');

INSERT INTO trainer_has (Trainer_ID, Pokemon_one, Pokemon_two, Pokemon_three, Pokemon_four, Pokemon_five, Pokemon_six)
VALUES
    (1, 'Pikachu', 'Charizard', 'Venasaur', 'Blastoise', NULL, NULL);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOSTNAME}:${process.env.PORT}/${process.env.DATABASE}`
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();
//To run script to populate db, run "node db/populatedb.js" in home directory (Should only be ran once)