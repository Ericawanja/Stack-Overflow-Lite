CREATE OR ALTER PROCEDURE getUser (@email varchar(300))
As
Begin
select * from users where email = @email
End

CREATE OR ALTER PROCEDURE getUserById (@id varchar(300))
As
Begin
select * from users where id = @id
End