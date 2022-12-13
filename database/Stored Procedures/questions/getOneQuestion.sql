CREATE
OR ALTER PROCEDURE getOneQuestion (@id varchar(200)) AS BEGIN
SET
    NOCOUNT ON;

select
    id,
    user_id,
    title,
    question,
    tags,
    created_on
    
from
    questions
where
    id = @id
    AND isdeleted = 0
END
go