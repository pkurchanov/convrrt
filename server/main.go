package main

import (
	"encoding/json"
	"fmt"
	"log"
	"maps"
	"net/http"
	"os"
	"path/filepath"
)

type Form struct {
	Dimension string  `json:"dimension"`
	Value     float64 `json:"value"`
	From      string  `json:"from"`
	To        string  `json:"to"`
}

var unitsPath = "units.json"
var clientPath = "client/"

var unitMap = make(map[string]float64)

func loadUnits() error {
	data, err := os.ReadFile(unitsPath)
	if err != nil {
		return err
	}
	var unitsByDimension map[string]map[string]float64
	if err := json.Unmarshal(data, &unitsByDimension); err != nil {
		return err
	}
	for _, units := range unitsByDimension {
		maps.Copy(unitMap, units)
	}
	return nil
}

func decodeAndConvert(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var data Form
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	normalizedFrom, okFrom := unitMap[data.From]
	normalizedTo, okTo := unitMap[data.To]
	if !okFrom || !okTo {
		http.Error(w, "unknown unit", http.StatusBadRequest)
		return
	}

	result := data.Value * normalizedFrom / normalizedTo
	fmt.Fprintf(w, "= %.6g", result)
}

func serveUnits(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, unitsPath)
}

func main() {
	if err := loadUnits(); err != nil {
		log.Fatalf("failed to load units: %s", err)
	}

	clientDir, err := filepath.Abs(clientPath)
	if err != nil {
		log.Fatalf("failed to resolve website assets: %s", err)
	}
	fileServer := http.FileServer(http.Dir(clientDir))

	http.Handle("/", fileServer)
	http.HandleFunc("/units", serveUnits)
	http.HandleFunc("/convert", decodeAndConvert)

	log.Println("listening on :9393")
	log.Fatal(http.ListenAndServe("0.0.0.0:9393", nil))
}
