package main

import (
	. "forum/server"
	"log"
)

func main() {
	err := Start()
	if err != nil {
		log.Fatal(err)
	}
}
