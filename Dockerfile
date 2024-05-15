FROM ubuntu:18.04

RUN mkdir -p /server && cp -r . /server && cd server && \
  apt install nodejs sqlite3 && \
  cd views && npm install && npm run build && \
  cd .. && \
  cd controller && npm install expressjs bodyparser && \
  npm start
