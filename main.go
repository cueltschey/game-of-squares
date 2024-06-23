package main

import (
	"net/http"
  "os"

  "game-of-squares/endpoints"
  "game-of-squares/db"

	"github.com/gorilla/mux"
)

func main() {
  // Open Database
  db.Init()

  r := mux.NewRouter()

  // GET
  r.HandleFunc("/squares", endpoints.GetSquaresForUser).Methods("GET")
  r.HandleFunc("/list", endpoints.GetListOfSquare).Methods("GET")
  r.HandleFunc("/tasks", endpoints.GetTasksOfUser).Methods("GET")
  r.HandleFunc("/summary", endpoints.GetMonthSummary).Methods("GET")
  r.HandleFunc("/verify", endpoints.VerifyAuth).Methods("GET")

  // POST
  r.HandleFunc("/login", endpoints.HandleLogin).Methods("POST")
  r.HandleFunc("/register", endpoints.RegisterUser).Methods("POST")
  r.HandleFunc("/update", endpoints.UpdateListEntry).Methods("POST")

  // File server
  fs := http.FileServer(http.Dir("frontend/dist/"))
	r.PathPrefix("/").Handler(fs)



  // Run the server
  port := os.Args[1]
  http.ListenAndServe(":" + port, r)
}

