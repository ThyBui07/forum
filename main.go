package main

import (
	"fmt"
	. "forum/server"
	"log"
	"os"
)

func main() {
	go exit()
	err := Start()
	if err != nil {
		log.Fatal(err)
	}
}

// exit() allows users to type 'x' to exit the program
func exit() {
	quit := ""
	fmt.Println("[Type 'x' to quit]")
	fmt.Scan(&quit)
	if quit != "x" {
		exit()
	} else {
		os.Exit(0)
	}
}
