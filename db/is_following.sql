SELECT * FROM followed_users
WHERE follower_id = ${user_id}
AND followee_id = ${this_user_id}