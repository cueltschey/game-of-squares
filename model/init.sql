CREATE TABLE square (
    id INTEGER PRIMARY KEY,
    date DATE,
    userid INTEGER,
    status INTEGER,
    FOREIGN KEY (userid) REFERENCES users(id)
);

CREATE TABLE users (
    userid INTEGER PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE tasks (
    taskid INTEGER PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    userid INTEGER,
    squareid INTEGER,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (squareid) REFERENCES square(id)
);
