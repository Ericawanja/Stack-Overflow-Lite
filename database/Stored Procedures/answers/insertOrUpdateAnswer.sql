CREATE OR ALTER PROCEDURE  insertOrUpdateAnswers(
@id varchar(200),
@user_id varchar(200),
@question_id varchar(200),
@answer varchar(600),
@preffered BIT = 0
)
AS
BEGIN
DECLARE @exist BIT 

SELECT @exist = COUNT(id) from answers where id= @id
if @exist = 0
Begin
 INSERT INTO answers(id, user_id, question_id, answer, created_on, preferred) 
  values (@id, @user_id, @question_id, @answer, GETDATE(), @preffered)
END 

ELSE 
 Begin
   UPDATE answers Set preferred = 1 where id= @id
 End
END 
go