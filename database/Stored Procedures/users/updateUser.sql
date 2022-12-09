--use QLite
CREATE
or ALTER PROCEDURE UpdateUser (
  
    @username varchar(200),
    @email varchar(200),
    @password varchar(200)
) AS BEGIN --UPDATE
UPDATE
    users
SET
    username = @username,
    password = @password
WHERE
    email = @email,
END
GO