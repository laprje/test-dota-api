UPDATE registered_users
SET
email = ${email},
profile_img = ${profile_img}
WHERE user_id = ${user_id};