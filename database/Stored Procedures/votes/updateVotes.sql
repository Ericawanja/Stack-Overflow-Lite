CREATE OR ALTER Procedure updateVotes (
@user_id varchar (200), 
@answer_id varchar (200), 
@vote INT
)
AS
BEGIN
update votes set votes= @vote where user_id = @user_id AND answer_id = @answer_id
END

