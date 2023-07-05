// main.go

package main

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"log"
)

func main() {

	// Handle requests to '/upload' endpoint
	http.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
			return
		}

		// Parse the multipart form in the request
		err := r.ParseMultipartForm(10 << 20) // 10 MB
		if err != nil {
			http.Error(w, "Error parsing file", http.StatusInternalServerError)
			return
		}

		// Retrieve the file from form data
		file, _, err := r.FormFile("file")
		if err != nil {
			http.Error(w, "Error retrieving file", http.StatusInternalServerError)
			return
		}
		defer file.Close()

		// Create a temporary file within our temp-images directory that follows
		// a particular naming pattern
		tempFile, err := os.CreateTemp("", "upload-*.csv")
		if err != nil {
			http.Error(w, "Error creating temporary file", http.StatusInternalServerError)
			return
		}
		defer tempFile.Close()

		// read all of the contents of our uploaded file into a
		// byte array
		fileBytes, err := io.ReadAll(file)
		if err != nil {
			http.Error(w, "Error reading file", http.StatusInternalServerError)
			return
		}

		// write this byte array to our temporary file
		tempFile.Write(fileBytes)

		// Parse CSV file
		ParseCsvFile(tempFile.Name())

		// Respond with a success message
		w.Write([]byte("Successfully uploaded file\n"))
	})

	// Handle requests to '/data' endpoint
	http.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(CsvData)
	})

	// Start HTTP server
	log.Println("Starting server on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
