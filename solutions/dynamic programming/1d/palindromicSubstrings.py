"""
647. Palindromic Substrings
Medium
9.9K
209
Companies
Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.

 

Example 1:

Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
Example 2:

Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 

Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.
"""
class Solution:
  def countSubstrings(self, s: str) -> int:
    count = 0
    for i in range(len(s)):
      count += self.findPalindromeSearchOutward(s,i,i) #odd length
      count += self.findPalindromeSearchOutward(s,i,i+1) #even length
    return count
  
  def findPalindromeSearchOutward(self, s, leftPointer, rightPointer):
    count = 0
    while leftPointer >= 0 and rightPointer < len(s) and s[leftPointer] == s[rightPointer]:
      #while pointers are not out of bound, and while still palindromic
      count += 1
      leftPointer -= 1
      rightPointer += 1
    return count