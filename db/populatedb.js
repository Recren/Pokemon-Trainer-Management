#! /usr/bin/env node
const { Client } = require("pg");
require('dotenv').config();

const SQL = `

CREATE TABLE IF NOT EXISTS regions(
    Region_Name varchar(50) NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS pokemon(
	Name varchar(50) NOT NULL PRIMARY KEY,
	Dex_num int NOT NULL UNIQUE,
    Region varchar(50) NOT NULL,
	Primary_type varchar(20) NOT NULL,
	Secondary_type varchar(20),

    FOREIGN KEY (Region) references regions(Region_Name)
        ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS trainers(
    Trainer_ID SERIAL PRIMARY KEY,
	Name varchar(50) NOT NULL,
    Region varchar(50) NOT NULL,
    FOREIGN KEY (Region) references regions(Region_Name)
        ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS trainer_has(
	Trainer_ID int NOT NULL,
    Team_name varchar(50) NOT NULL,
	Pokemon_one varchar(50),
	Pokemon_two varchar(50),
	Pokemon_three varchar(50),
	Pokemon_four varchar(50),
	Pokemon_five varchar(50),
	Pokemon_six varchar(50),
	
    PRIMARY KEY(Trainer_ID, Team_name),

	FOREIGN KEY (Trainer_ID) references trainers(Trainer_ID)
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

INSERT INTO regions (Region_Name)
VALUES
    ('Kanto'),
    ('Johto'),
    ('Hoenn'),
    ('Sinnoh'),
    ('Unova'),
    ('Kalos');

INSERT INTO pokemon (Name, Dex_num, Region, Primary_type, Secondary_type) 
VALUES
    ('Venusaur', '3', 'Kanto', 'Grass', 'Poison'),
    ('Charizard', '6', 'Kanto', 'Fire', 'Flying'),
    ('Blastoise', '9', 'Kanto', 'Water', NULL),
    ('Butterfree', '12', 'Kanto', 'Bug', 'Flying'),
    ('Beedrill', '15', 'Kanto', 'Bug', 'Poison'),
    ('Pidgeot', '18', 'Kanto', 'Normal', 'Flying'),
    ('Raticate', '20', 'Kanto', 'Normal', NULL),
    ('Fearow', '22', 'Kanto', 'Normal', 'Flying'),
    ('Arbok', '24', 'Kanto', 'Poison', NULL),
    ('Pikachu', '25', 'Kanto', 'Electric', NULL),
    ('Raichu', '26', 'Kanto', 'Electric', NULL),
    ('Meganium', '154', 'Johto', 'Grass', NULL),
    ('Typhlosion', '157', 'Johto', 'Fire', NULL),
    ('Feraligatr', '160', 'Johto', 'Water', NULL),
    ('Noctowl', '164', 'Johto', 'Normal', 'Flying'),
    ('Ariados', '168', 'Johto', 'Bug', 'Poison'),
    ('Togetic', '176', 'Johto', 'Fairy', 'Flying'),
    ('Sceptile', '254', 'Hoenn', 'Grass', NULL),
    ('Blaziken', '257', 'Hoenn', 'Fire', 'Fighting'),
    ('Swampert', '260', 'Hoenn', 'Water', 'Ground'),
    ('Mightyena', '262', 'Hoenn', 'Dark', NULL),
    ('Shiftry', '275', 'Hoenn', 'Grass', 'Dark'),
    ('Gardevoir', '282', 'Hoenn', 'Psychic', 'Fairy'),
    ('Breloom', '286', 'Hoenn', 'Grass', 'Fighting'),
    ('Slaking', '289', 'Hoenn', 'Normal', NULL),
    ('Aggron', '306', 'Hoenn', 'Steel', 'Rock'),
    ('Manectric', '311', 'Hoenn', 'Electric', NULL),
    ('Sharpedo', '319', 'Hoenn', 'Water', 'Dark'),
    ('Torterra', '389', 'Sinnoh', 'Grass', 'Ground'),
    ('Infernape', '392', 'Sinnoh', 'Fire', 'Fighting'),
    ('Empoleon', '395', 'Sinnoh', 'Water', 'Steel'),
    ('Staraptor', '398', 'Sinnoh', 'Normal', 'Flying'),
    ('Luxray', '405', 'Sinnoh', 'Electric', NULL),
    ('Rampardos', '409', 'Sinnoh', 'Rock', NULL),
    ('Bastiodon', '411', 'Sinnoh', 'Rock', 'Steel'),
    ('Victini', '494', 'Unova', 'Psychic', 'Fire'),
    ('Serperior', '497', 'Unova', 'Grass', NULL),
    ('Emboar', '500', 'Unova', 'Fire', 'Fighting'),
    ('Samurott', '503', 'Unova', 'Water', NULL),
    ('Stoutland', '508', 'Unova', 'Normal', NULL),
    ('Simisage', '512', 'Unova', 'Grass', 'Fighting'),
    ('Simisear', '514', 'Unova', 'Fire', 'Fighting'),
    ('Simipour', '516', 'Unova', 'Water', 'Fighting'),
    ('Unfezant', '521', 'Unova', 'Normal', 'Flying'),
    ('Zebstrika', '523', 'Unova', 'Electric', NULL),
    ('Gigalith', '526', 'Unova', 'Rock', NULL),
    ('Excadrill', '530', 'Unova', 'Ground', 'Steel'),
    ('Seismitoad', '537', 'Unova', 'Water', 'Ground'),
    ('Leavanny', '542', 'Unova', 'Bug', 'Grass'),
    ('Lilligant', '549', 'Unova', 'Grass', NULL),
    ('Krookodile', '553', 'Unova', 'Ground', 'Dark'),
    ('Chesnaught', '652', 'Kalos', 'Grass', 'Fighting'),
    ('Delphox', '655', 'Kalos', 'Fire', 'Psychic'),
    ('Greninja', '658', 'Kalos', 'Water', 'Dark'),
    ('Talonflame', '663', 'Kalos', 'Fire', 'Flying'),
    ('Pyroar', '668', 'Kalos', 'Fire', 'Normal'),
    ('Florges', '671', 'Kalos', 'Fairy', NULL),
    ('Pangoro', '675', 'Kalos', 'Fighting', 'Dark');

INSERT INTO trainers (Name, Region)
VALUES
    ('Red', 'Kanto'),
    ('Blue', 'Kanto'),
    ('Ethan', 'Johto'),
    ('Lyra', 'Johto'),
    ('Brendan', 'Hoenn'),
    ('May', 'Hoenn'),
    ('Lucas', 'Sinnoh'),
    ('Dawn', 'Sinnoh'),
    ('Hilbert', 'Unova'),
    ('Hilda', 'Unova'),
    ('Calem', 'Kalos'),
    ('Serana', 'Kalos');


INSERT INTO trainer_has (Trainer_ID, Team_name, Pokemon_one, Pokemon_two, Pokemon_three, Pokemon_four, Pokemon_five, Pokemon_six)
VALUES
    (1, 'The Beginning', 'Pikachu', 'Charizard', 'Butterfree', 'Pidgeot', NULL, NULL),
    (2, 'The End', 'Blastoise', 'Beedrill', 'Fearow', 'Raticate', NULL, NULL),
    (3, 'Main Team', 'Feraligatr', 'Noctowl', 'Ariados', NULL, NULL, NULL),
    (4, 'Main Team', 'Meganium', 'Togetic', 'Raichu', NULL, NULL, NULL),
    (5, 'Main Team', 'Sceptile', 'Slaking', 'Sharpedo', NULL, NULL, NULL),
    (6, 'Main Team', 'Blaziken', 'Swampert', 'Gardevoir', 'Breloom', NULL, NULL),
    (7, 'Main Team', 'Torterra', 'Infernape', 'Staraptor', 'Raichu', 'Luxray', 'Rampardos'),
    (8, 'Main Team', 'Empoleon', 'Bastiodon', 'Mightyena', NULL, NULL, NULL),
    (9, 'Main Team', 'Emboar', 'Samurott', 'Krookodile', NULL, NULL, NULL),
    (10, 'Main Team', 'Serperior', 'Lilligant', 'Victini', 'Unfezant', NULL, NULL),
    (11, 'Main Team', 'Greninja', 'Talonflame', 'Pangoro', NULL, NULL, NULL),
    (12, 'Main Team', 'Delphox', 'Chesnaught', 'Florges', 'Seismitoad', 'Zebstrika', 'Blastoise');
    
`;

async function main() {
    console.log("populating...");
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