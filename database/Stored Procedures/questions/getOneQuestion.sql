CREATE OR ALTER PROCEDURE getOneQuestion (@id varchar(200))
AS
BEGIN
 SET NOCOUNT ON;
select * from questions where id = @id AND isdeleted = 0
 
END
go