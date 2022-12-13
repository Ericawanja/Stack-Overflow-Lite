CREATE OR ALTER PROCEDURE getQuestionAnswers (@id varchar(200))
AS
BEGIN
SET NOCOUNT ON;
select * from answers where answers.question_id = @id
 FOR JSON PATH, INCLUDE_NULL_VALUES;
END