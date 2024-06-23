package main

import (
	"fmt"
	"net/http"
  "os"
  "log"

  "game-of-squares/endpoints"
  "game-of-squares/db"
)

func tasksHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		endpoints.GetTasksOfUser(w, r)
	case http.MethodPost:
    log.Printf("Not implemented")
	case http.MethodDelete:
    log.Printf("Not implemented")
	default:
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
}

func main() {
  // Open Database
  db.Init()

  // GET
  fs := http.FileServer(http.Dir("frontend/dist/"))
	http.Handle("/", fs)
  http.HandleFunc("/squares", endpoints.GetSquaresForUser)
  http.HandleFunc("/list", endpoints.GetListOfSquare)
  http.HandleFunc("/tasks", tasksHandler)
  http.HandleFunc("/summary", endpoints.GetMonthSummary)

  // POST
  http.HandleFunc("/login", endpoints.HandleLogin)



  // Run the server
  port := os.Args[1]
  fmt.Printf("Server Listening on: http://localhost:%s\n\n", port)
	if err := http.ListenAndServe(":" + port, nil); err != nil {
    log.Printf("Main() failed to start server: %v\n", err)
	}
}

