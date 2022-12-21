create table votes (
user_id varchar(200) FOREIGN KEY REFERENCES users(id) NOT NULL,
answer_id varchar(200) FOREIGN KEY REFERENCES answers(id),
votes INT default 0,

)
