CREATE TABLE squares (
  id INTEGER PRIMARY KEY,
  date DATE,
  userid INTEGER,
  completed INTEGER,
  total INTEGER,
  FOREIGN KEY (userid) REFERENCES users(id)
);

CREATE TABLE users (
  userid INTEGER PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE list (
  id INTEGER PRIMARY KEY,
  userid INTEGER,
  squareid INTEGER,
  taskid INTEGER,
  FOREIGN KEY (taskid) REFERENCES tasks(taskid),
  FOREIGN KEY (userid) REFERENCES users(userid),
  FOREIGN KEY (squareid) REFERENCES square(id)
);

CREATE TABLE tasks (
  taskid INTEGER PRIMARY KEY,
  name VARCHAR(255),
  description TEXT
);

INSERT INTO tasks (name, description) VALUES ('Github', 'Must');
INSERT INTO users (name, password, email) VALUES ('test','test','test@test.com');
INSERT INTO squares (date, userid, completed, total) VALUES (DATE('now', '-3 days'), 1, 0, (SELECT COUNT(*) FROM tasks));
