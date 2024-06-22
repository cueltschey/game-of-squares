package endpoints

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

  "game-of-squares/squares"
  "game-of-squares/db"
)


func GetSquaresForUser(w http.ResponseWriter, r *http.Request) {
  // TODO: change frontend squares query
  database := db.Get()
  userIDStr := r.URL.Query().Get("userid")
	userID, err := strconv.ParseInt(userIDStr, 10, 64)
	if err != nil {
		http.Error(w, "Bad Request: userid required", http.StatusBadRequest)
		return
	}

	if userID == 0 {
		http.Error(w, "Bad Request: userid required", http.StatusBadRequest)
		return
	}

	squares.AddSquaresFromLast(userID, database)

	query := fmt.Sprintf("SELECT * FROM squares WHERE userid = %d ORDER BY date ASC", userID)
	rows, err := database.Query(query)
	if err != nil {
    log.Printf("GetSquaresForUser(): %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var squares []map[string]interface{}
	for rows.Next() {
		var id int
		var date string
		var userid int
		var completed int
		var total int
		err := rows.Scan(&id, &date, &userid, &completed, &total)
		if err != nil {
			log.Println(err)
			continue
		}
		square := map[string]interface{}{
			"id":        id,
			"date":      date,
			"userid":    userid,
			"completed": completed,
			"total":     total,
		}
		squares = append(squares, square)
	}

	// Encode squares into JSON and send response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(squares)
}

func GetListOfSquare(w http.ResponseWriter, r *http.Request) {
	// Parse userid and squareid from URL parameters
  database := db.Get()

	userIDStr := r.URL.Query().Get(":userid")
	squareIDStr := r.URL.Query().Get(":squareid")
	userID, err := strconv.ParseInt(userIDStr, 10, 64)
	if err != nil {
		http.Error(w, "Bad Request: userid required", http.StatusBadRequest)
		return
	}
	squareID, err := strconv.ParseInt(squareIDStr, 10, 64)
	if err != nil {
		http.Error(w, "Bad Request: squareid required", http.StatusBadRequest)
		return
	}

	// Check if userid and squareid are present
	if userID == 0 || squareID == 0 {
		http.Error(w, "Bad Request: userid and squareid required", http.StatusBadRequest)
		return
	}

	query := "SELECT * FROM list WHERE userid = ? AND squareid = ?"
	rows, err := database.Query(query, userID, squareID)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	if !rows.Next() {
		squares.UpdateTasksOfSquare(userID, squareID, database)

		rows, err = database.Query(query, userID, squareID)
		if err != nil {
			log.Println(err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()
	}

	var list []map[string]interface{}
	for rows.Next() {
		var id int
		var userid int
		var squareid int
		var taskid int
		var completed int
		err := rows.Scan(&id, &userid, &squareid, &taskid, &completed)
		if err != nil {
			log.Println(err)
			continue
		}
		item := map[string]interface{}{
			"id":        id,
			"userid":    userid,
			"squareid":  squareid,
			"taskid":    taskid,
			"completed": completed,
		}
		list = append(list, item)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}
