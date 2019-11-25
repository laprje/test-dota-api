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
	profile_img TEXT, 
	profile_id VARCHAR(20),
	is_admin VARCHAR(5)
);

CREATE TABLE hash (
	hash_id SERIAL PRIMARY KEY,
	hash TEXT,
	user_id INT REFERENCES registered_users(user_id)
);

CREATE TABLE followed_users (
	id SERIAL PRIMARY KEY,
	follower_id INT REFERENCES registered_users(user_id),
	followee_id INT REFERENCES users(id)
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

INSERT INTO registered_users (username, email, profile_img, is_admin)
VALUES 
('Stephen', 'hubbard_stephen@yahoo.com', '', ''),
('Admin', 'xteclisx27@yahoo.com', '', 'yes');

INSERT INTO hash (hash, user_id)
VALUES ('password', 1),
('s3cret', 2);

SELECT * FROM registered_users ru
JOIN followed_users fu 
ON
fu.followee_id = ru.user_id
WHERE ru.user_id IN (SELECT followee_id FROM followed_users
                		WHERE follower_id = 5)
        

