CREATE
OR ALTER Procedure getAnswerUPvotes (@answer_id varchar(200)) AS Begin
select
    a.id,
    count(v.upvote) as upvotes
from
    answers a
    left join answerVotes v on a.id = v.answer_id
where
    a.isdeleted = 0
    AND a.id = @answer_id
    AND v.upvote = 1
Group by
    v.answer_id,
    a.id
End