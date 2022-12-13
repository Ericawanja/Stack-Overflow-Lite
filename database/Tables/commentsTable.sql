use QLite CREATE TABLE comments(
    id varchar(200) PRIMARY KEY,
    user_id varchar(200) FOREIGN KEY REFERENCES users(id) NOT NULL,
    answer_id varchar(200) FOREIGN KEY REFERENCES answers(id) NOT NULL,
    comment varchar(400) not null,
    added_on DATE,
    isdeleted BIT DEFAULT 0
)