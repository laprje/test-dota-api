SELECT * FROM registered_users ru
JOIN followed_users fu 
ON fu.follower_id = ru.user_id
WHERE ru.user_id IN (SELECT follower_id FROM followed_users
WHERE follower_id = $1);