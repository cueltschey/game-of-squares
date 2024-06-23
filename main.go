package main

import (
	"fmt"
	"net/http"
  "os"
  "log"

  "game-of-squares/endpoints"
  "game-of-squares/db"
)

func main() {
  // Open Database
  db.Init()

  // Initialize endpoint handlers
  fs := http.FileServer(http.Dir("frontend/dist/"))
	http.Handle("/", fs)
  http.HandleFunc("/squares", endpoints.GetSquaresForUser)
  http.HandleFunc("/list", endpoints.GetListOfSquare)
  http.HandleFunc("/tasks", endpoints.GetTasksOfUser)



  // Run the server
  port := os.Args[1]
  fmt.Printf("Server Listening on: http://localhost:%s\n\n", port)
	if err := http.ListenAndServe(":" + port, nil); err != nil {
    log.Printf("Main() failed to start server: %v\n", err)
	}
}

