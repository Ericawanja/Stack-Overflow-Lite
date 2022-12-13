Create or Alter Procedure insertOrUpdateAnswerVotes(
@user_id varchar(200), 
@answer_id varchar(200),
@upvote Bit = 0,
@downvote Bit = 0
)
AS
Begin
  Declare @exists Bit
  select @exists = count(user_id) from answerVotes where user_id = @user_id AND answer_id = @answer_id
  if @exists = 0
    Begin
	 insert into answerVotes (user_id, answer_id, upvote, downvote) values(@user_id, @answer_id, @upvote, @downvote)
    End
  Else
    Begin 
	  update answerVotes set downvote= @downvote, upvote = @upvote where user_id = @user_id And answer_id = @answer_id
    End
End