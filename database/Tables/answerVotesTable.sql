create table answerVotes (
user_id varchar(200) FOREIGN KEY REFERENCES users(id) NOT NULL,
answer_id varchar(200) FOREIGN KEY REFERENCES answers(id),
upvote Bit default 0,
downvote Bit default 0
)
