package main

import (
	. "forum/server"
	u "forum/utils"
)

func main() {
	err := Start()
	u.CheckErr(err)
}
