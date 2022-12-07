CREATE
OR ALTER procedure deleteQuestion(@id varchar(200)) AS BEGIN
SET
    NOCOUNT ON;

--update is deleted
UPDATE
    questions
set
    isdeleted = 1
where
    id = @id
END
go