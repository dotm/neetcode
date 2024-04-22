package main

import "fmt"

func main() {
	// fmt.Println("Hello")
	test(nil)
}

func test(extra []string) {
	for _, value := range extra {
		fmt.Println(value)
	}
}
