use QLite CREATE TABLE questions(
    id varchar(200) primary key,
    user_id varchar(200) FOREIGN KEY REFERENCES users(id) NOT NULL,
    title varchar(200) NOT NULL,
    question varchar(500) NOT NULL,
    tags varchar(400) NOT NULL,
    created_on DATE NOT NULL,
    isdeleted BIT DEFAULT 0 NOT NULL
)