CREATE
OR ALTER PROCEDURE updatePreferredAnswer(@id varchar(200)) AS BEGIN
SET
  NOCOUNT ON;

UPDATE
  answers
Set
  preferred = 1
where
  id = @id
END
go