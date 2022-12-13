CREATE
OR ALTER procedure search (@searchTerm varchar(300)) As Begin
select
    *
from
    questions
where
    question Like '%' + @searchTerm + '%'
    OR tags Like '%' + @searchTerm + '%'
    OR title Like '%' + @searchTerm + '%'
End