package squares

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

func AddSquaresFromLast(userid int64, db *sql.DB) {
	currentDate := time.Now().Format("2006-01-02") // Format as YYYY-MM-DD

	recentDateQuery := "SELECT MAX(date) AS maxDate FROM squares WHERE userid = ?"
	var mostRecentDate string
	err := db.QueryRow(recentDateQuery, userid).Scan(&mostRecentDate)
	if err != nil {
    log.Printf("AddSquaresFromLast(): %v\n", err)
    return
	}

	currentDateObj, _ := time.Parse("2006-01-02", currentDate)
	mostRecentDateObj, _ := time.Parse("2006-01-02", mostRecentDate)

	currentDateIterator := mostRecentDateObj
	for currentDateIterator.Before(currentDateObj) {
		currentDateIterator = currentDateIterator.AddDate(0, 0, 1) // Increment date by 1 day
		formattedDate := currentDateIterator.Format("2006-01-02")
		query := "SELECT COUNT(*) AS count FROM squares WHERE date = ? AND userid = ?"
		var count int
		err := db.QueryRow(query, formattedDate, userid).Scan(&count)
		if err != nil {
      log.Printf("AddSquaresFromLast(): %v\n", err)
		}
		if count == 0 {
			_, err := db.Exec("INSERT INTO squares (date, userid, completed, total) VALUES (?, ?, ?, (SELECT COUNT(*) FROM tasks))", formattedDate, userid, 0)
			if err != nil {
        log.Printf("AddSquaresFromLast(): %v\n", err)
        return
			} else {
				fmt.Printf("New square inserted for %s with userid: %d\n", formattedDate, userid)
        return
			}
		}
	}
}


func UpdateTasksOfSquare(userid int64, squareid int64, db *sql.DB) {
	rows, err := db.Query("SELECT taskid FROM tasks WHERE disabled = 0")
	if err != nil {
    log.Printf("UpdateTasksOfSquare(): %v\n", err)
	}
	defer rows.Close()

	var promises []func() error

	for rows.Next() {
		var taskid int64
		if err := rows.Scan(&taskid); err != nil {
      log.Printf("UpdateTasksOfSquare(): %v\n", err)
		}

		promises = append(promises, func() error {
			_, err := db.Exec("INSERT INTO list (userid, squareid, taskid, completed) VALUES (?, ?, ?, ?)",
				userid, squareid, taskid, 0)
			if err != nil {
				return err
			}
			fmt.Printf("New Task inserted for userid: %d taskid: %d\n", userid, taskid)
			return nil
		})
	}
	if err := rows.Err(); err != nil {
     log.Printf("UpdateTasksOfSquare(): %v\n", err)
	}

	for _, promise := range promises {
		if err := promise(); err != nil {
      log.Printf("UpdateTasksOfSquare(): %v\n", err)
		}
	}

	// Update squares table with total count
	_, err = db.Exec("UPDATE squares SET total = ? WHERE userid = ? AND id = ?",
		len(promises), userid, squareid)
	if err != nil {
    log.Printf("UpdateTasksOfSquare(): %v\n", err)
	}
}

func CreateFirstSquare(userid int64, db *sql.DB) {
	currentDate := time.Now().Format("2006-01-02")

	query := "SELECT COUNT(*) AS count FROM squares WHERE date = ? AND userid = ?"

	var count int
	err := db.QueryRow(query, currentDate, userid).Scan(&count)
	if err != nil {
    log.Printf("CreateFirstSquare(): %v\n", err)
	}

	if count == 0 {
		_, err := db.Exec("INSERT INTO squares (date, userid, completed, total) VALUES (?, ?, ?, (SELECT COUNT(*) FROM tasks))",
			currentDate, userid, 0)
		if err != nil {
      log.Printf("CreateFirstSquare(): %v\n", err)
		} else {
			fmt.Printf("New square inserted for %s with userid: %d\n", currentDate, userid)
		}
    _, err = db.Exec("INSERT INTO tasks (name, description, userid) VALUES ('Example Task', 'Click to add and remove tasks', ?)",
    userid)
    if err != nil {
      log.Printf("CreateFirstSquare(): %v\n", err)
		} else {
			fmt.Printf("New task inserted for %s with userid: %d\n", currentDate, userid)
		}
	} else {
		fmt.Printf("Entry already exists for %s\n", currentDate)
	}
}
