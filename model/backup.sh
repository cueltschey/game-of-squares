#!/bin/bash

mkdir -p backup

if ! command -v sqlite3 &>/dev/null; then
	echo "SQLite3 is not installed. Installing..."
	sudo apt-get update
	sudo apt-get install sqlite3
fi

current_datetime=$(date +"%Y-%m-%d_%H-%M-%S")

ls | grep ".db" | while
	read -r file
do
	no_ext=$(basename "$file" | cut -d. -f1)
	echo $no_ext
	sqlite3 $file .dump >"./backup/$no_ext${current_datetime}.sql"
done
