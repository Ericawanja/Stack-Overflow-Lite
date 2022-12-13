CREATE OR ALTER PROCEDURE deleteComment(@id varchar(200))
AS
SET NOCOUNT ON;
BEGIN
update comments set isdeleted = 1 where id = @id
END
GO