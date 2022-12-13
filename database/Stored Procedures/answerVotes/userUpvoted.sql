Create or Alter procedure userUpvoted (@user_id varchar (200), @answer_id varchar (200))
AS
Begin
select upvote from answerVotes where user_id = @user_id And answer_id = @answer_id And upvote >0
End