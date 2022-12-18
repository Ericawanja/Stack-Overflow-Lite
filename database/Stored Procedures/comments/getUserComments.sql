CREATE
OR ALTER PROCEDURE getUserComments(@user_id varchar(200)) AS BEGIN
select
    *
from
    comments
where
    user_id = @user_id
    and isdeleted = 0
END