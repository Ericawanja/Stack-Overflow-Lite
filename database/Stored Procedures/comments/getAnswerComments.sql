CREATE OR ALTER PROCEDURE getAnswerComments(@id varchar(200))
As
Begin
select * from comments where answer_id = @id
FOR JSON PATH, INCLUDE_NULL_VALUES;
End