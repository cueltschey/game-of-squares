FROM ubuntu:20.04

RUN mkdir -p /server 

COPY . /server

RUN apt update && apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

RUN cd /server && \
  apt install -y nodejs sqlite3 && \
  cd /server/view && npm install --force && npm run build

RUN  cd /server/controller && npm install 
