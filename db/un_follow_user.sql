DELETE FROM followed_users
WHERE follower_id = ${follower_id}
AND followee_id = ${followee_id}