CREATE
OR ALTER PROCEDURE getQuestionAnswers (@id varchar(200)) AS BEGIN
SET
    NOCOUNT ON;

select
    a.id,
    a.user_id,
    a.question_id,
    a.answer,
    a.created_on,
    a.preferred
from
    answers AS a
where
    a.question_id = @id
    And a.isdeleted = 0
END
go