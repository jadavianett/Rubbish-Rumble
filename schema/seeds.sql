USE choose_your_fighter_db;
INSERT INTO users (user_name) VALUES ("Evelyn"), ("Jada"), ("Sami"), ("Caleb");

INSERT INTO characters (character_name, advantage, avatar_image, wins, losses, user_id)
VALUES ("E-dog", "HP", "https://via.placeholder.com/300", 0, 0, 1),
("J-parrot", "attack", "https://via.placeholder.com/300", 0, 0, 2),
("S-cat", "defense", "https://via.placeholder.com/300", 0, 0, 3),
("C-hamster", "attack", "https://via.placeholder.com/300", 0, 0, 4);