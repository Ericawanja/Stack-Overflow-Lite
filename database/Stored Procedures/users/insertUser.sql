CREATE
or ALTER PROCEDURE insertUser (
    @id varchar(200),
    @username varchar(200),
    @email varchar(200),
    @password varchar(200)
) AS BEGIN
INSERT INTO
    users (id, username, email, password)
VALUES
    (@id, @username, @email, @password)
END