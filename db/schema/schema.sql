CREATE DATABASE IF NOT EXISTS choose_your_fighter_db;
USE choose_your_fighter_db;

CREATE TABLE IF NOT EXISTS users (
	id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    user_name VARCHAR(255)
    character
);

CREATE TABLE IF NOT EXISTS characters (
	id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    character_name VARCHAR (255),
    advantage VARCHAR(255),
    avatar_image VARCHAR(255),
    wins INT,
    losses INT,
    hp INT,
    atk INT,
    def INT,
    user_id INT
);