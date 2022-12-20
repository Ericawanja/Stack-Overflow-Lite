CREATE
OR ALTER procedure search (
@searchTerm varchar(300),
 @page bigint = 1,  
 @limit bigint = 5
) As Begin
select
    id as question_id,
	user_id, 
	title,
	question,
	tags,
	created_on
from
    questions
where
    question Like '%' + @searchTerm + '%'
    OR tags Like '%' + @searchTerm + '%'
    OR title Like '%' + @searchTerm + '%'
	AND isdeleted = 0
	 ORDER BY created_on DESC  
 OFFSET @limit * (@page-1) ROWS  
 FETCH NEXT @limit ROWS ONLY  
  
End