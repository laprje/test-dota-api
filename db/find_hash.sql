SELECT * FROM registered_users h
JOIN hash hh ON h.user_id = hh.user_id
WHERE username = $1;