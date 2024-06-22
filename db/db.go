package db

import (
    "database/sql"
    "log"

    _ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func Init() *sql.DB {
    db, err := sql.Open("sqlite3", "db/squares.db")
    if err != nil {
      log.Printf("db.Init(): %v\n", err)
    }
    DB = db
    return DB
}

func Get() *sql.DB {
    return DB
}
