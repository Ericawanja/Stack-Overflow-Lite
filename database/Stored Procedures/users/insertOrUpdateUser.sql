--use QLite
--insert  a user
CREATE
or ALTER PROCEDURE insertOrUpdateUser (
    @id varchar(200),
    @username varchar(200),
    @email varchar(200),
    @password varchar(200)
) AS BEGIN DECLARE @exists bit
SELECT
    @exists = COUNT(id)
from
    users
where
    id = @id if @exists = 0 --INSERT
INSERT INTO
    users (id, username, email, password)
VALUES
    (@id, @username, @email, @password)
    else --UPDATE
UPDATE
    users
SET
    id = @id,
    username = @username,
    email = @email,
    password = @password
WHERE
    id = @id
END
GO