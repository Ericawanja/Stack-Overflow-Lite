use QLite CREATE TABLE answers (
    id varchar(200) primary key,
    user_id varchar(200) FOREIGN KEY REFERENCES users(id) NOT NULL,
    question_id varchar(200) FOREIGN KEY REFERENCES questions(id) NOT NULL,
    answer varchar(400) NOT NULL,
    created_on DATE NOT NULL,
    preferred BIT DEFAULT 0
)