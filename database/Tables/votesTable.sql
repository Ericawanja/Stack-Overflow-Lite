use QLite CREATE TABLE votes(
    id varchar(200) PRIMARY KEY,
    user_id varchar(200) FOREIGN KEY REFERENCES users(id) NOT NULL,
    answer_id varchar(200) FOREIGN KEY REFERENCES answers(id) NOT NULL,
    votes INT NOT NULL
)