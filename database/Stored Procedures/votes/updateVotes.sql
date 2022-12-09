CREATE
OR ALTER PROCEDURE updateVotes(
    @id varchar(200),
    @user_id varchar(200),
    @answer_id varchar(200),
    @votes INT
) AS
SET
    NOCOUNT ON;

BEGIN
UPDATE
    votes
set
    user_id = @user_id,
    answer_id = @answer_id,
    votes = @votes
where
    @id = id
END
go