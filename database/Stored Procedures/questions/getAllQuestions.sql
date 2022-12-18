CREATE
OR ALTER PROCEDURE getAllQuestions (@user_id varchar(200) = Null) AS BEGIN
SET
    NOCOUNT ON;

if @user_id IS NOT NULL BEGIN -- GET USERS QUESTIONS
select
    q.id as question_id,
    q.user_id,
    q.title,
    q.question,
    q.tags,
    q.created_on,
    count(a.answer) as answers
from
    questions q
    left join answers a on a.question_id = q.id AND a.isdeleted =0
where
    q.isdeleted = 0
    AND q.user_id = @user_id
group by
    q.id,
    q.user_id,
    q.title,
    q.question,
    q.tags,
    q.created_on 

END
ELSE BEGIN -- GET ALL QUESTIONS
select
    q.id as question_id,
    q.user_id,
    q.title,
    q.question,
    q.tags,
    q.created_on,
    count(a.answer) as answers
from
    questions q
    left join answers a on a.question_id = q.id AND a.isdeleted =0
where
    q.isdeleted = 0
group by
    q.id,
    q.user_id,
    q.title,
    q.question,
    q.tags,
    q.created_on 
ORDER BY q.created_on DESC

END
END