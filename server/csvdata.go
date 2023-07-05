// csvdata.go

package main

import (
	"encoding/csv"
	"os"
	"log"
)

type Entry struct {
	Description string `json:"description"`
	Occurrence  int    `json:"occurrence"`
}

// global map to store csv data
var CsvData map[string]*Entry

// function to parse csv and populate CsvData
func ParseCsvFile(filePath string) {
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatalf("Failed to open CSV file: %s", err)
	}

	r := csv.NewReader(file)
	records, err := r.ReadAll()
	if err != nil {
		log.Fatalf("Failed to read CSV file: %s", err)
	}

	// Initialize CsvData
	CsvData = make(map[string]*Entry)

	// Skip header
	records = records[1:]

	// Iterate over records
	for _, record := range records {
		description := record[2]
		if _, ok := CsvData[description]; ok {
			CsvData[description].Occurrence++
		} else {
			CsvData[description] = &Entry{Description: description, Occurrence: 1}
		}
	}
}
