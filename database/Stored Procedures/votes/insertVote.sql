CREATE OR ALTER PROCEDURE insertVotes(
@id varchar(200),
@user_id varchar(200),
@answer_id varchar(200)

)
As
Begin
SET NOCOUNT ON;
insert votes(id, user_id, answer_id, votes) Values (@id, @user_id, @answer_id, 1)
End
Go