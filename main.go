package main

import (
	"log"
	"server/server"
)

func main() {
	err := server.Start()
	if err != nil {
		log.Fatal(err)
	}
}
