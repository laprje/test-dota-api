UPDATE registered_users
SET
email = ${email},
profile_img = ${profile_img},
account_id = ${account_id}
WHERE user_id = ${user_id};