CREATE OR ALTER PROCEDURE getOneQuestion (@id varchar(200))
AS
BEGIN
 SET NOCOUNT ON;
select * from questions where id = @id
  FOR JSON PATH, INCLUDE_NULL_VALUES;
END
go