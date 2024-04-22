"""
To check for palindrome efficiently,
start from the middle (1 element for odd-length word, and 2 elements for even-length word),
and then work outward (adding one element to the left and one element to the right).
This is because then we know if the subproblem is palindrome (the inside characters)
and the left + right character is also the same, then the bigger subproblem is also palindrome.
"""