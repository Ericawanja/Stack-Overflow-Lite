CREATE
OR ALTER PROCEDURE getUser (@id varchar(200)) As Begin
select
    *
from
    users
where
    id = @id
End