package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"path/filepath"
)

type Form struct {
	Dimension string  `json:"dimension"`
	Value     float64 `json:"value"`
	From      string  `json:"from"`
	To        string  `json:"to"`
}

var unitMap = map[string]float64{
	// length
	"meters":          1,
	"giraffes":        5,
	"bananas":         0.18,
	"rice grains":     0.006,
	"credit cards":    0.05398,
	"human hairs":     0.000075,
	"blue whales":     25,
	"eiffel towers":   330,
	"lunar distances": 384_400_000,
	// area
	"square meters":   1,
	"football fields": 5350,
	"soccer pitches":  7140,
	"rhode islands":   3_144_000_000,
	"texas areas":     695_662_000_000,
	// volume
	"cubic meters":           1,
	"millibuckets":           0.001,
	"olympic swimming pools": 2500,
	"bathtubs":               0.302,
	"soda cans":              0.000355,
	"refrigerators":          0.85,
	"mini fridges":           0.15,
	"microwaves":             0.074,
	"washing machines":       0.357,
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

	normalizedFrom := unitMap[data.From]
	normalizedTo := unitMap[data.To]
	result := data.Value * normalizedFrom / normalizedTo

	fmt.Fprintf(w, "= %.6g", result)
}

func main() {
	clientDir, err := filepath.Abs("../client")
	if err != nil {
		log.Fatalf("failed to resolve website assets: %s", err)
	}
	fileServer := http.FileServer(http.Dir(clientDir))

	http.Handle("/", fileServer)
	http.HandleFunc("/convert", decodeAndConvert)

	log.Println("listening on :9393")
	log.Fatal(http.ListenAndServe(":9393", nil))
}
