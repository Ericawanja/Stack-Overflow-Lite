CREATE
OR ALTER PROCEDURE getComments

As Begin
select
    *
from
    comments
where
     isdeleted = 0
End