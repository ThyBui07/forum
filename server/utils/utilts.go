package utils

import "log"

// If error logFatal
func CheckErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
