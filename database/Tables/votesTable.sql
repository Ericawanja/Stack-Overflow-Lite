use QLite CREATE TABLE votes(
    answer_id varchar(200) FOREIGN KEY REFERENCES answers(id) NOT NULL,
    votes INT NOT NULL
)