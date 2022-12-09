CREATE OR ALTER PROCEDURE getAnswer(@id varchar(200))
AS
BEGIN
select * from answers where id= @id
END