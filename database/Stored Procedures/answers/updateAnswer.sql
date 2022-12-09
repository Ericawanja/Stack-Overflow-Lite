CREATE
OR ALTER PROCEDURE updateAnswer( @id varchar(200), @answer varchar(400)) AS BEGIN
SET
    NOCOUNT ON;

UPDATE
    answers
SET
    answer = @answer
where
    id = @id
END
GO