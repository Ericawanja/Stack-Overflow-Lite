CREATE
OR ALTER PROCEDURE getUserAnswers(@user_id varchar(200)) AS BEGIN
select
    *
from
    answers
where
    user_id = @user_id
    AND isdeleted = 0
END