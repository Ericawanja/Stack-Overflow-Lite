CREATE OR ALTER Procedure insertVotes (
@user_id varchar (200), 
@answer_id varchar (200), 
@vote INT
)
AS
BEGIN
insert into votes values ( @user_id , @answer_id, @vote)
END
