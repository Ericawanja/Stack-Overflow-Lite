CREATE OR ALTER PROCEDURE getVotes(@answer_id varchar(200))
AS
BEGIN
select votes from votes where @answer_id = answer_id
END