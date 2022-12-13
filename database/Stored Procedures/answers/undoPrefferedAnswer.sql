CREATE
OR ALTER PROCEDURE undoPreferredAnswer(@id varchar(200)) AS BEGIN
SET
    NOCOUNT ON;

UPDATE
    answers
Set
    preferred = 0
where
    id = @id
END
go