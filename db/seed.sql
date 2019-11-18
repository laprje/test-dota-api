DROP TABLE IF EXISTS hash;
DROP TABLE IF EXISTS registered_users;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial primary key,
    name varchar(50),
    account_id varchar(50)
);

CREATE TABLE registered_users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(100),
	email VARCHAR(100),
	profile_img TEXT
);

CREATE TABLE hash (
	hash_id SERIAL PRIMARY KEY,
	hash TEXT,
	user_id INT REFERENCES registered_users(user_id)
);

INSERT INTO users (name, account_id)
VALUES (
'Dfarm',
'154890067'
), (
'Parker',
'95212404'
), (
'Stephen',
'58684391'
);

INSERT INTO registered_users (username, email, profile_img)
VALUES 
('Stephen', 'hubbard_stephen@yahoo.com', 'https://steamcdn-a.akamaihd.net/apps/dota2/images/mars/hero_mars93fd33s5.jpg'),
('Stephen2', 'xteclisx27@yahoo.com', 'https://i.pinimg.com/originals/9e/4c/ae/9e4caef87f8d429e7360cc49d9df118e.jpg');

INSERT INTO hash (hash, user_id)
VALUES ('password', 1),
('s3cret', 2);



