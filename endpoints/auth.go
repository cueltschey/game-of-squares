package endpoints

import (
  "database/sql"
	"encoding/json"
	"log"
	"net/http"
  "time"

  "game-of-squares/db"
  "game-of-squares/squares"

  "github.com/gorilla/securecookie"
)

const SessionName = "session"

var scookie = securecookie.New(
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

  // Set session cookie
	value := map[string]interface{}{
		"userid":   user.UserID,
		"username": creds.Username,
	}
	encoded, err := scookie.Encode(SessionName, value)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	cookie := &http.Cookie{
		Name:     SessionName,
		Value:    encoded,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour), // Example: session expires in 24 hours
		HttpOnly: true,
	}
	http.SetCookie(w, cookie)

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
  jsonData, err := json.Marshal(user)
		if err != nil {
			http.Error(w, "Failed to marshal JSON", http.StatusInternalServerError)
			return
	}
  w.Write(jsonData)
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {

  database := db.Get()

	var user struct {
		Username  string `json:"username"`
		Password  string `json:"password"`
		Email     string `json:"email"`
		Birthdate string `json:"birthdate"`
	}

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Bad Request: invalid JSON", http.StatusBadRequest)
		return
	}

  var existingUserId User

	err = database.QueryRow("SELECT userid FROM users WHERE name = ?", user.Username).Scan(&existingUserId.UserID)
	if err != nil && err != sql.ErrNoRows {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	if existingUserId.UserID != 0 {
		http.Error(w, "Username already exists", http.StatusBadRequest)
		return
	}

	// Check if username already exists
	var existingUser User
	err = database.QueryRow("SELECT userid FROM users WHERE name = ?", user.Username).Scan(&existingUser.UserID)
	if err != nil && err != sql.ErrNoRows {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	if existingUser.UserID != 0 {
		http.Error(w, "Username already exists", http.StatusBadRequest)
		return
	}

	// Insert new user
	result, err := database.Exec("INSERT INTO users (name, password, email, birthdate) VALUES (?, ?, ?,?)", user.Username, user.Password, user.Email, user.Birthdate)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	userID, err := result.LastInsertId()
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

  squares.CreateFirstSquare(userID, database)

	// Perform additional operations after user registration (e.g., inserting initial data)
	// insertInitial(userID)
	response := map[string]int64{"userid": userID}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func VerifyAuth(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie(SessionName)
	if err != nil {
		if err == http.ErrNoCookie {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	var value map[string]interface{}
	if err = scookie.Decode(SessionName, cookie.Value, &value); err != nil {
    log.Printf("Cookie decode error: %v\n",err)
    response := map[string]int{"authenticated": 0}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
		return
	}

	userID, _ := value["userid"].(int)


	// User is authenticated
  response := map[string]int{"authenticated": 1, "userid": userID}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}


