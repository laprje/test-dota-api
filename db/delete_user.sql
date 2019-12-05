DELETE FROM followed_users 
WHERE follower_id = ${this_user_id}
AND followee_id = ${this_user_id};

DELETE FROM hash WHERE user_id = ${this_user_id};

DELETE FROM registered_users WHERE account_id = ${id};