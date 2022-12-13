CREATE
OR ALTER PROCEDURE getComment(@id varchar(200)) As Begin
select
    *
from
    comments
where
    id = @id
    AND isdeleted = 0
End