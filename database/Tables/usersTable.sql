use QLite --users table
CREATE TABLE users(
    id varchar(200) primary key,
    username varchar(200) NOT NULL,
    email varchar(200) unique NOT NULL,
    password varchar(200) NOT NULL
)