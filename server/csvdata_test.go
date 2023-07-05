// server/csvdata_test.go

package main

import (
	"testing"
)

func TestParseCSVFile(t *testing.T) {
	filepath := "test.csv" // assuming a well formatted test file is present in your directory
	descriptions, transactions, err := parseCSVFile(filepath)
	if err != nil {
		t.Fatalf("failed to parse CSV file: %v", err)
	}
	
	// Assuming the 'test.csv' file contains two transactions with the same description
	if len(descriptions) != 1 {
		t.Fatalf("expected descriptions to have length 1, got %v", len(descriptions))
	}
	
	if descriptions["Test Description"] != 2 {
		t.Errorf("expected descriptions[\"Test Description\"] to be 2, got %v", descriptions["Test Description"])
	}
	
	if len(transactions) != 2 {
		t.Fatalf("expected transactions to have length 2, got %v", len(transactions))
	}
}

func TestParseCSVFileWithNonexistentFile(t *testing.T) {
	filepath := "nonexistent.csv"
	_, _, err := parseCSVFile(filepath)
	if err == nil {
		t.Fatalf("expected error when parsing nonexistent file, got nil")
	}
}
