PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE square (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    userid INT,
    status INT,
    FOREIGN KEY (userid) REFERENCES users(id)
);
INSERT INTO square VALUES(NULL,'2024-04-28 20:30:28',1,0);
CREATE TABLE users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);
INSERT INTO users VALUES(NULL,'test','test@test.com','test');
CREATE TABLE tasks (
    taskid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    userid INT,
    squareid INT,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (squareid) REFERENCES square(id)
);
COMMIT;