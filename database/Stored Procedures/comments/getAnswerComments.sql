CREATE
OR ALTER PROCEDURE getAnswerComments(@id varchar(200)) As Begin
select
    id,
    user_id,
    answer_id,
    comment
from
    comments
where
    answer_id = @id
    AND isdeleted = 0
End