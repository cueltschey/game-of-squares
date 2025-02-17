PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE squares (
  id INTEGER PRIMARY KEY,
  date DATE,
  userid INTEGER,
  completed INTEGER,
  total INTEGER,
  FOREIGN KEY (userid) REFERENCES users(id)
);
INSERT INTO squares VALUES(1,'2024-01-06',1,0,5);
INSERT INTO squares VALUES(2,'2024-01-07',1,0,6);
INSERT INTO squares VALUES(3,'2024-01-10',1,0,6);
INSERT INTO squares VALUES(4,'2024-01-15',1,0,6);
INSERT INTO squares VALUES(5,'2024-01-16',1,0,6);
INSERT INTO squares VALUES(6,'2024-01-08',1,0,6);
INSERT INTO squares VALUES(7,'2024-01-18',1,0,6);
INSERT INTO squares VALUES(8,'2024-01-19',1,0,6);
INSERT INTO squares VALUES(9,'2024-01-20',1,0,6);
INSERT INTO squares VALUES(10,'2024-01-21',1,0,6);
INSERT INTO squares VALUES(11,'2024-01-22',1,0,6);
INSERT INTO squares VALUES(12,'2024-01-23',1,0,6);
INSERT INTO squares VALUES(13,'2024-01-24',1,0,6);
INSERT INTO squares VALUES(14,'2024-01-25',1,0,6);
INSERT INTO squares VALUES(15,'2024-01-17',1,0,6);
INSERT INTO squares VALUES(16,'2024-01-27',1,0,6);
INSERT INTO squares VALUES(17,'2024-01-28',1,0,6);
INSERT INTO squares VALUES(18,'2024-01-29',1,0,6);
INSERT INTO squares VALUES(19,'2024-01-30',1,0,6);
INSERT INTO squares VALUES(20,'2024-01-31',1,0,6);
INSERT INTO squares VALUES(21,'2024-02-01',1,0,6);
INSERT INTO squares VALUES(22,'2024-01-12',1,0,6);
INSERT INTO squares VALUES(23,'2024-02-03',1,0,6);
INSERT INTO squares VALUES(24,'2024-02-04',1,0,6);
INSERT INTO squares VALUES(25,'2024-01-26',1,0,6);
INSERT INTO squares VALUES(26,'2024-02-06',1,0,6);
INSERT INTO squares VALUES(27,'2024-02-07',1,0,6);
INSERT INTO squares VALUES(28,'2024-02-05',1,3,6);
INSERT INTO squares VALUES(29,'2024-02-09',1,0,6);
INSERT INTO squares VALUES(30,'2024-02-02',1,0,6);
INSERT INTO squares VALUES(31,'2024-01-11',1,0,6);
INSERT INTO squares VALUES(32,'2024-02-10',1,0,6);
INSERT INTO squares VALUES(33,'2024-02-13',1,0,6);
INSERT INTO squares VALUES(34,'2024-02-14',1,0,6);
INSERT INTO squares VALUES(35,'2024-02-11',1,0,6);
INSERT INTO squares VALUES(36,'2024-02-16',1,0,6);
INSERT INTO squares VALUES(37,'2024-02-17',1,0,6);
INSERT INTO squares VALUES(38,'2024-02-18',1,0,6);
INSERT INTO squares VALUES(39,'2024-02-12',1,0,6);
INSERT INTO squares VALUES(40,'2024-02-20',1,0,6);
INSERT INTO squares VALUES(41,'2024-02-21',1,0,6);
INSERT INTO squares VALUES(42,'2024-02-22',1,0,6);
INSERT INTO squares VALUES(43,'2024-02-23',1,0,6);
INSERT INTO squares VALUES(44,'2024-02-24',1,0,6);
INSERT INTO squares VALUES(45,'2024-02-19',1,0,6);
INSERT INTO squares VALUES(46,'2024-02-26',1,0,6);
INSERT INTO squares VALUES(47,'2024-02-27',1,1,5);
INSERT INTO squares VALUES(48,'2024-02-28',1,0,5);
INSERT INTO squares VALUES(49,'2024-02-29',1,0,6);
INSERT INTO squares VALUES(50,'2024-03-01',1,0,6);
INSERT INTO squares VALUES(51,'2024-03-02',1,0,6);
INSERT INTO squares VALUES(52,'2024-03-03',1,0,6);
INSERT INTO squares VALUES(53,'2024-03-04',1,0,6);
INSERT INTO squares VALUES(54,'2024-03-05',1,0,6);
INSERT INTO squares VALUES(55,'2024-02-15',1,0,6);
INSERT INTO squares VALUES(56,'2024-03-07',1,0,6);
INSERT INTO squares VALUES(57,'2024-02-25',1,0,6);
INSERT INTO squares VALUES(58,'2024-03-08',1,0,6);
INSERT INTO squares VALUES(59,'2024-02-08',1,0,6);
INSERT INTO squares VALUES(60,'2024-03-09',1,0,6);
INSERT INTO squares VALUES(61,'2024-03-11',1,0,6);
INSERT INTO squares VALUES(62,'2024-03-10',1,0,6);
INSERT INTO squares VALUES(63,'2024-03-13',1,0,6);
INSERT INTO squares VALUES(64,'2024-03-14',1,0,6);
INSERT INTO squares VALUES(65,'2024-03-15',1,0,6);
INSERT INTO squares VALUES(66,'2024-03-16',1,0,6);
INSERT INTO squares VALUES(67,'2024-03-17',1,0,6);
INSERT INTO squares VALUES(68,'2024-03-12',1,0,6);
INSERT INTO squares VALUES(69,'2024-03-06',1,0,6);
INSERT INTO squares VALUES(70,'2024-03-19',1,0,6);
INSERT INTO squares VALUES(71,'2024-03-21',1,0,6);
INSERT INTO squares VALUES(72,'2024-03-22',1,0,6);
INSERT INTO squares VALUES(73,'2024-03-23',1,0,6);
INSERT INTO squares VALUES(74,'2024-03-18',1,0,6);
INSERT INTO squares VALUES(75,'2024-03-24',1,0,6);
INSERT INTO squares VALUES(76,'2024-03-25',1,0,6);
INSERT INTO squares VALUES(77,'2024-03-27',1,0,6);
INSERT INTO squares VALUES(78,'2024-03-20',1,0,6);
INSERT INTO squares VALUES(79,'2024-03-29',1,0,6);
INSERT INTO squares VALUES(80,'2024-03-30',1,0,6);
INSERT INTO squares VALUES(81,'2024-03-31',1,0,6);
INSERT INTO squares VALUES(82,'2024-04-01',1,0,6);
INSERT INTO squares VALUES(83,'2024-04-02',1,0,6);
INSERT INTO squares VALUES(84,'2024-04-03',1,0,6);
INSERT INTO squares VALUES(85,'2024-04-04',1,0,6);
INSERT INTO squares VALUES(86,'2024-04-05',1,0,6);
INSERT INTO squares VALUES(87,'2024-04-06',1,0,6);
INSERT INTO squares VALUES(88,'2024-04-07',1,0,6);
INSERT INTO squares VALUES(89,'2024-04-08',1,0,6);
INSERT INTO squares VALUES(90,'2024-04-09',1,0,6);
INSERT INTO squares VALUES(91,'2024-04-10',1,0,6);
INSERT INTO squares VALUES(92,'2024-04-11',1,0,6);
INSERT INTO squares VALUES(93,'2024-04-12',1,0,6);
INSERT INTO squares VALUES(94,'2024-04-13',1,0,6);
INSERT INTO squares VALUES(95,'2024-04-14',1,0,6);
INSERT INTO squares VALUES(96,'2024-04-15',1,0,6);
INSERT INTO squares VALUES(97,'2024-04-16',1,0,6);
INSERT INTO squares VALUES(98,'2024-04-17',1,0,6);
INSERT INTO squares VALUES(99,'2024-04-18',1,0,6);
INSERT INTO squares VALUES(100,'2024-04-19',1,0,6);
INSERT INTO squares VALUES(101,'2024-04-20',1,0,6);
INSERT INTO squares VALUES(102,'2024-04-21',1,0,6);
INSERT INTO squares VALUES(103,'2024-04-22',1,0,6);
INSERT INTO squares VALUES(104,'2024-03-28',1,0,6);
INSERT INTO squares VALUES(105,'2024-04-24',1,0,6);
INSERT INTO squares VALUES(106,'2024-04-25',1,0,6);
INSERT INTO squares VALUES(107,'2024-04-26',1,0,6);
INSERT INTO squares VALUES(108,'2024-03-26',1,0,6);
INSERT INTO squares VALUES(109,'2024-04-28',1,0,6);
INSERT INTO squares VALUES(110,'2024-04-29',1,0,6);
INSERT INTO squares VALUES(111,'2024-04-30',1,0,5);
INSERT INTO squares VALUES(112,'2024-05-01',1,0,6);
INSERT INTO squares VALUES(113,'2024-05-02',1,0,6);
INSERT INTO squares VALUES(114,'2024-05-03',1,0,6);
INSERT INTO squares VALUES(115,'2024-05-04',1,0,6);
INSERT INTO squares VALUES(116,'2024-03-10',1,0,6);
INSERT INTO squares VALUES(117,'2024-05-05',1,0,6);
INSERT INTO squares VALUES(118,'2024-01-14',1,0,6);
INSERT INTO squares VALUES(119,'2024-01-09',1,0,6);
INSERT INTO squares VALUES(120,'2024-04-27',1,0,6);
INSERT INTO squares VALUES(121,'2024-05-06',1,0,6);
INSERT INTO squares VALUES(122,'2024-04-23',1,0,6);
INSERT INTO squares VALUES(123,'2024-01-13',1,0,6);
INSERT INTO squares VALUES(124,'2024-05-07',1,0,6);
INSERT INTO squares VALUES(125,'2024-05-08',1,0,6);
INSERT INTO squares VALUES(126,'2024-05-09',1,1,5);
INSERT INTO squares VALUES(127,'2024-05-10',1,0,5);
INSERT INTO squares VALUES(128,'2024-05-11',1,2,5);
INSERT INTO squares VALUES(129,'2024-05-12',1,5,5);
INSERT INTO squares VALUES(130,'2024-05-15',1,0,6);
INSERT INTO squares VALUES(131,'2024-05-16',1,0,6);
INSERT INTO squares VALUES(132,'2024-05-18',1,2,6);
INSERT INTO squares VALUES(133,'2024-05-14',1,0,6);
INSERT INTO squares VALUES(134,'2024-05-13',1,0,6);
INSERT INTO squares VALUES(135,'2024-05-17',1,0,6);
INSERT INTO squares VALUES(136,'2024-05-19',1,0,5);
CREATE TABLE users (
  userid INTEGER PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);
INSERT INTO users VALUES(1,'test','test@test.com','test');
INSERT INTO users VALUES(2,'tester','test@test.com','tester');
INSERT INTO users VALUES(3,'tester1','test@test.com','tester1');
INSERT INTO users VALUES(4,'tester2','test@test.com','tester2');
INSERT INTO users VALUES(5,'tester3','test@test.com','tester3');
INSERT INTO users VALUES(6,'tester4','test@test.com','tester4');
INSERT INTO users VALUES(7,'5tester4','test@test.com','tester5');
INSERT INTO users VALUES(8,'5tester5','test@test.com','tester5');
INSERT INTO users VALUES(9,'5tester6','test@test.com','tester6');
INSERT INTO users VALUES(10,'aaaaaaaa','test@test.com','blahblah');
INSERT INTO users VALUES(11,'blah','blah@test.com','blah');
INSERT INTO users VALUES(12,'blah7','blah@test.com','blah7');
INSERT INTO users VALUES(13,'blah76','blah@test.com','blah76');
INSERT INTO users VALUES(14,'blah766','blah@test.com','blah766');
INSERT INTO users VALUES(15,'blah7667','blah@test.com','blah7667');
INSERT INTO users VALUES(16,'blah76678','blah@test.com','blah76678');
INSERT INTO users VALUES(17,'testing','testing@test.com','testing');
INSERT INTO users VALUES(18,'testing1','testing@test.com','testing1');
CREATE TABLE list (
  id INTEGER PRIMARY KEY,
  userid INTEGER,
  squareid INTEGER,
  taskid INTEGER, completed INTEGER,
  FOREIGN KEY (taskid) REFERENCES tasks(taskid),
  FOREIGN KEY (userid) REFERENCES users(userid),
  FOREIGN KEY (squareid) REFERENCES square(id)
);
INSERT INTO list VALUES(1,1,62,1,0);
INSERT INTO list VALUES(2,1,62,5,0);
INSERT INTO list VALUES(3,1,62,6,0);
INSERT INTO list VALUES(4,1,62,4,0);
INSERT INTO list VALUES(5,1,62,2,0);
INSERT INTO list VALUES(6,1,62,3,0);
INSERT INTO list VALUES(7,1,60,1,0);
INSERT INTO list VALUES(8,1,60,2,0);
INSERT INTO list VALUES(9,1,60,6,0);
INSERT INTO list VALUES(10,1,60,4,0);
INSERT INTO list VALUES(11,1,60,5,0);
INSERT INTO list VALUES(12,1,60,3,0);
INSERT INTO list VALUES(13,1,127,1,0);
INSERT INTO list VALUES(14,1,127,5,0);
INSERT INTO list VALUES(15,1,127,4,0);
INSERT INTO list VALUES(16,1,127,2,0);
INSERT INTO list VALUES(17,1,127,3,0);
INSERT INTO list VALUES(18,1,126,1,0);
INSERT INTO list VALUES(19,1,126,5,0);
INSERT INTO list VALUES(20,1,126,3,0);
INSERT INTO list VALUES(21,1,126,4,1);
INSERT INTO list VALUES(22,1,126,2,0);
INSERT INTO list VALUES(23,1,47,1,0);
INSERT INTO list VALUES(24,1,47,2,0);
INSERT INTO list VALUES(25,1,47,4,1);
INSERT INTO list VALUES(26,1,47,5,0);
INSERT INTO list VALUES(27,1,47,3,0);
INSERT INTO list VALUES(28,1,48,1,0);
INSERT INTO list VALUES(29,1,48,5,0);
INSERT INTO list VALUES(30,1,48,4,0);
INSERT INTO list VALUES(31,1,48,2,0);
INSERT INTO list VALUES(32,1,48,3,0);
INSERT INTO list VALUES(33,1,129,1,1);
INSERT INTO list VALUES(34,1,129,5,1);
INSERT INTO list VALUES(35,1,129,3,1);
INSERT INTO list VALUES(36,1,129,4,1);
INSERT INTO list VALUES(37,1,129,2,1);
INSERT INTO list VALUES(38,1,128,1,1);
INSERT INTO list VALUES(39,1,128,5,1);
INSERT INTO list VALUES(40,1,128,3,0);
INSERT INTO list VALUES(41,1,128,4,0);
INSERT INTO list VALUES(42,1,128,2,0);
INSERT INTO list VALUES(43,1,53,1,0);
INSERT INTO list VALUES(44,1,53,5,0);
INSERT INTO list VALUES(45,1,53,6,0);
INSERT INTO list VALUES(46,1,53,4,0);
INSERT INTO list VALUES(47,1,53,2,0);
INSERT INTO list VALUES(48,1,53,3,0);
INSERT INTO list VALUES(49,1,49,1,0);
INSERT INTO list VALUES(50,1,49,5,0);
INSERT INTO list VALUES(51,1,49,6,0);
INSERT INTO list VALUES(52,1,49,4,0);
INSERT INTO list VALUES(53,1,49,2,0);
INSERT INTO list VALUES(54,1,49,3,0);
INSERT INTO list VALUES(55,1,28,1,1);
INSERT INTO list VALUES(56,1,28,5,1);
INSERT INTO list VALUES(57,1,28,6,1);
INSERT INTO list VALUES(58,1,28,2,0);
INSERT INTO list VALUES(59,1,28,3,0);
INSERT INTO list VALUES(60,1,28,4,0);
INSERT INTO list VALUES(61,1,27,1,0);
INSERT INTO list VALUES(62,1,27,5,0);
INSERT INTO list VALUES(63,1,27,6,0);
INSERT INTO list VALUES(64,1,27,3,0);
INSERT INTO list VALUES(65,1,27,2,0);
INSERT INTO list VALUES(66,1,27,4,0);
INSERT INTO list VALUES(67,1,26,1,0);
INSERT INTO list VALUES(68,1,26,5,0);
INSERT INTO list VALUES(69,1,26,6,0);
INSERT INTO list VALUES(70,1,26,4,0);
INSERT INTO list VALUES(71,1,26,2,0);
INSERT INTO list VALUES(72,1,26,3,0);
INSERT INTO list VALUES(73,1,132,2,0);
INSERT INTO list VALUES(74,1,132,5,0);
INSERT INTO list VALUES(75,1,132,6,0);
INSERT INTO list VALUES(76,1,132,1,1);
INSERT INTO list VALUES(77,1,132,3,1);
INSERT INTO list VALUES(78,1,132,4,0);
INSERT INTO list VALUES(79,1,135,1,0);
INSERT INTO list VALUES(80,1,135,2,0);
INSERT INTO list VALUES(81,1,135,6,0);
INSERT INTO list VALUES(82,1,135,5,0);
INSERT INTO list VALUES(83,1,135,3,0);
INSERT INTO list VALUES(84,1,135,4,0);
INSERT INTO list VALUES(85,1,1,1,0);
INSERT INTO list VALUES(86,1,1,5,0);
INSERT INTO list VALUES(87,1,1,4,0);
INSERT INTO list VALUES(88,1,1,2,0);
INSERT INTO list VALUES(89,1,1,3,0);
INSERT INTO list VALUES(90,1,111,1,0);
INSERT INTO list VALUES(91,1,111,5,0);
INSERT INTO list VALUES(92,1,111,4,0);
INSERT INTO list VALUES(93,1,111,2,0);
INSERT INTO list VALUES(94,1,111,3,0);
INSERT INTO list VALUES(95,1,136,1,0);
INSERT INTO list VALUES(96,1,136,5,0);
INSERT INTO list VALUES(97,1,136,3,0);
INSERT INTO list VALUES(98,1,136,4,0);
INSERT INTO list VALUES(99,1,136,2,0);
CREATE TABLE tasks (
  taskid INTEGER PRIMARY KEY,
  name VARCHAR(255),
  description TEXT
, userid INTEGER);
INSERT INTO tasks VALUES(1,'Github Commit','commit to github for the day',1);
INSERT INTO tasks VALUES(2,'Anki','Study anki for the day',1);
INSERT INTO tasks VALUES(3,'Excercise','Excercise in the morning and evening',1);
INSERT INTO tasks VALUES(4,'Walk with Josh','Every day you need to walk with josh. Its good for the soul.',1);
INSERT INTO tasks VALUES(5,'Work on 5G','Work 4 Hours For the Lab',1);
COMMIT;
