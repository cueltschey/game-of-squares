package endpoints

import (
  "database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

  "game-of-squares/db"

  "github.com/gorilla/securecookie"
)

var cookieHandler = securecookie.New(
	securecookie.GenerateRandomKey(64),
	securecookie.GenerateRandomKey(32))

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type User struct {
	UserID    int    `json:"userid"`
	Birthdate string `json:"birthdate"`
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
  database := db.Get()
	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, "Bad Request: invalid JSON", http.StatusBadRequest)
		return
	}

	query := "SELECT userid, birthdate FROM users WHERE name = ? AND password = ?"
	row := database.QueryRow(query, creds.Username, creds.Password)

	var user User
	err = row.Scan(&user.UserID, &user.Birthdate)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
		} else {
			log.Printf("Database error: %v\n", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
		return
	}

	setCookie(w, "userid", fmt.Sprintf("%d", user.UserID))
	setCookie(w, "authenticated", "true")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func setCookie(w http.ResponseWriter, name string, value string) {
	if encoded, err := cookieHandler.Encode(name, value); err == nil {
		cookie := &http.Cookie{
			Name:     name,
			Value:    encoded,
			Path:     "/",
			MaxAge:   900,
			HttpOnly: true,
		}
		http.SetCookie(w, cookie)
	} else {
		log.Printf("Cookie encoding error: %v\n", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}


