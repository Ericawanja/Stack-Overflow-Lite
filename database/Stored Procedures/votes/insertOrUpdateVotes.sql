CREATE OR ALTER PROCEDURE insertOrUpdateVotes(
@answer_id varchar(200),
@votes INT =1
)

As
Begin
SET NOCOUNT ON;
DECLARE @exists BIT
   Select @exists= count(answer_id) from votes where answer_id = @answer_id
if @exists =0
 BEGIN
  insert votes( answer_id, votes) Values ( @answer_id, 1)
 End
Else  
  BEGIN
    UPDATE votes set  votes = @votes where answer_id = @answer_id
   END
End
Go