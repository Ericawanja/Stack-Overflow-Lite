CREATE
OR ALTER PROCEDURE insertAnswer(
  @id varchar(200),
  @user_id varchar(200),
  @question_id varchar(200),
  @answer varchar(600),
  @preffered BIT = 0
) AS BEGIN
SET
  NOCOUNT ON;

INSERT INTO
  answers(
    id,
    user_id,
    question_id,
    answer,
    created_on,
    preferred
  )
values
  (
    @id,
    @user_id,
    @question_id,
    @answer,
    GETDATE(),
    @preffered
  )
END
go