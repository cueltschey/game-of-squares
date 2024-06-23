package endpoints

import (
	"encoding/json"
	"log"
	"net/http"
  "strconv"

  "game-of-squares/db"
)

func UpdateListEntry(w http.ResponseWriter, r *http.Request) {

  database := db.Get()

  userIDStr := r.URL.Query().Get("userid")
  listIDStr := r.URL.Query().Get("listid")
  completedStr := r.URL.Query().Get("completed")
  userID, err := strconv.ParseInt(userIDStr, 10, 64)
	if err != nil {
		http.Error(w, "Bad Request: userid required", http.StatusBadRequest)
		return
	}
  listID, err := strconv.ParseInt(listIDStr, 10, 64)
	if err != nil {
		http.Error(w, "Bad Request: listid required", http.StatusBadRequest)
		return
	}
  completed, err := strconv.ParseInt(completedStr, 10, 64)
	if err != nil {
		http.Error(w, "Bad Request: completed required", http.StatusBadRequest)
		return
	}

	_, err = database.Exec("UPDATE list SET completed = ? WHERE userid = ? AND id = ?", completed, userID, listID)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	var increment int64
	if completed == 0 {
		increment = -1
	} else {
		increment = completed
	}
	_, err = database.Exec("UPDATE squares SET completed = completed + ? WHERE id = (SELECT squareid FROM list WHERE id = ?)", increment, listID)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	response := map[string]int64{"completed": completed}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
