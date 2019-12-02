select * from followed_users

select * from registered_users

select * from users

INSERT INTO followed_users(follower_id, followee_id)
VALUES 
(5, 15)

UPDATE registered_users
SET account_id = 8628965
WHERE user_id = 13

DELETE FROM followed_users
WHERE followee_id IS null