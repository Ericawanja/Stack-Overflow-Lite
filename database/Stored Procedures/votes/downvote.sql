CREATE OR ALTER Procedure downvote(
@user_id varchar(200),
@answer_id varchar(200)
)
AS
BEGIN
insert into votes values(@user_id, @answer_id, -1)
END