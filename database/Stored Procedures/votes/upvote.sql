CREATE OR ALTER Procedure upvote(
@user_id varchar(200),
@answer_id varchar(200)
)
AS
BEGIN
insert into votes values(@user_id, @answer_id, 1)
END