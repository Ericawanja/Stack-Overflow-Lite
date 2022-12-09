CREATE OR ALTER PROCEDURE insertComment(
@id varchar(200),
@user_id varchar(200),
@answer_id varchar(200),
@comment varchar(500)
)
AS
BEGIN
SET NOCOUNT ON;
DECLARE @Dt datetime =GETDATE()

INSERT INTO comments (id, user_id, answer_id, comment, added_on) VALUES (@id, @user_id, @answer_id, @comment, @Dt )
END

GO