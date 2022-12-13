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
    count(q.id) as answers
from
    questions q
    left join answers a on a.question_id = q.id
where
    isdeleted = 0
    AND q.user_id = 'ghyd'
group by
    q.id,
    q.user_id,
    q.title,
    q.question,
    q.tags,
    q.created_on FOR JSON PATH,
    INCLUDE_NULL_VALUES;

END
ELSE BEGIN -- GET ALL QUESTIONS
select
    q.id as question_id,
    q.user_id,
    q.title,
    q.question,
    q.tags,
    q.created_on,
    count(q.id) as answers
from
    questions q
    left join answers a on a.question_id = q.id
where
    isdeleted = 0
group by
    q.id,
    q.user_id,
    q.title,
    q.question,
    q.tags,
    q.created_on FOR JSON PATH,
    INCLUDE_NULL_VALUES;

END
END