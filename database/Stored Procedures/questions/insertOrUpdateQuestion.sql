CREATE
OR ALTER PROCEDURE insertOrUpdateQuestions (
    @id varchar(200),
    @user_id varchar(200),
    @title varchar(300),
    @question varchar(600),
    @tags varchar(600),
    --@created_on DATE= ,
    @isdeleted bit = 0
) As Begin
SET
    NOCOUNT ON;

DECLARE @exists BIT
select
    @exists = count(id)
from
    questions
where
    id = @id if @exists = 0 --insert
INSERT INTO
    questions
VALUES
    (
        @id,
        @user_id,
        @title,
        @question,
        @tags,
        GETDATE(),
        @isdeleted
    )
    else --update
UPDATE
    questions
set
    id = @id,
    user_id = @user_id,
    title = @title,
    question = @question,
    tags = @tags
where
    id = @id
End
go