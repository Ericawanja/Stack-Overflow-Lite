CREATE OR ALTER PROCEDURE getAnswers
AS
BEGIN
select id, user_id, question_id, answer, created_on, preferred from answers where isdeleted =0
END