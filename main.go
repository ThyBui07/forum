package main

import (
	. "forum/server"
	u "forum/server/utils"
)

func main() {
	err := Start()
	u.CheckErr(err)
}
