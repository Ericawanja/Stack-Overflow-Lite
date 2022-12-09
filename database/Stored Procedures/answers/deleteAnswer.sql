CREATE OR ALTER PROCEDURE deleteAnswer (@id varchar(200))
AS
BEGIN

SET NOCOUNT ON;
update answers set isdeleted = 1 where id=@id
END
go