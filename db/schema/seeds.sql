USE choose_your_fighter_db;
INSERT INTO users (user_name) VALUES ("Evelyn"), ("Jada"), ("Sami"), ("Caleb");

INSERT INTO characters (character_name, advantage, avatar_image, wins, losses, hp, atk, def, user_id)
VALUES ("E-dog", "HP", "https://via.placeholder.com/300", 0, 0, 40, 12, 15, 1),
("J-parrot", "attack", "https://via.placeholder.com/300", 0, 0, 55, 13, 12, 2),
("S-cat", "defense", "https://via.placeholder.com/300", 0, 0, 35, 18, 14, 3),
("C-hamster", "attack", "https://via.placeholder.com/300", 0, 0, 40, 16, 13, 4);
