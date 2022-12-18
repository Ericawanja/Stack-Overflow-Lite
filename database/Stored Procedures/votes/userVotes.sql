Create
or Alter procedure userVotes (@user_id varchar (200), @answer_id varchar (200)) AS Begin
select
    votes
from
    votes
where
    user_id = @user_id
    And answer_id = @answer_id
End
go