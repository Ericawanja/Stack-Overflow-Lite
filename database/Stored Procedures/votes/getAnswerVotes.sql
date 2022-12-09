CREATE OR ALTER PROCEDURE insertVotes(
@id varchar(200)
)
AS
BEGIN

select * from votes where id=@id
END
GO