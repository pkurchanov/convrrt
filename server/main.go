package main

import (
	"encoding/json"
	"log"
	"net/http"
	"path/filepath"
)

// TODO:
// [x] webpage
// [x] submit form to server
// [ ] convert value
// [ ] display value

type Form struct {
	Dimension string `json:"dimension"`
	Value     int    `json:"value"`
	From      string `json:"from"`
	To        string `json:"to"`
}

func decodeJSON(w http.ResponseWriter, r *http.Request) {
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
	log.Printf("received request: %d %s to %s\n", data.Value, data.From, data.To)
}

func main() {
	clientDir, err := filepath.Abs("../client")
	if err != nil {
		log.Fatalf("failed to resolve website assets: %s", err)
	}
	fileServer := http.FileServer(http.Dir(clientDir))

	http.Handle("/", fileServer)
	http.HandleFunc("/convert", decodeJSON)

	log.Println("listening on :9393")
	log.Fatal(http.ListenAndServe(":9393", nil))
}
