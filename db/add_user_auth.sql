INSERT INTO registered_users (username, email)
VALUES (${username}, ${email})
RETURNING user_id;