"""
5. Longest Palindromic Substring
Medium
28.4K
1.7K
Companies
Given a string s, return the longest 
palindromic
 
substring
 in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.
"""
class Solution:
  def longestPalindrome(self, s: str) -> str:
    result = ""
    resultLength = 0
    for i in range(len(s)):
      #odd length
      resultOdd, resultLengthOdd = self.findPalindromeSearchOutward(s,i,i)
      if resultLengthOdd > resultLength:
        result = resultOdd
        resultLength = resultLengthOdd
      
      #even length
      resultEven, resultLengthEven = self.findPalindromeSearchOutward(s,i,i+1)
      if resultLengthEven > resultLength:
        result = resultEven
        resultLength = resultLengthEven
    return result
  
  def findPalindromeSearchOutward(self, s, leftPointer, rightPointer):
    result = ""
    resultLength = 0
    while leftPointer >= 0 and rightPointer < len(s) and s[leftPointer] == s[rightPointer]:
      #while pointers are not out of bound, and while still palindromic
      newLength = rightPointer - leftPointer + 1
      if newLength > resultLength:
        result = s[leftPointer:rightPointer+1]
        resultLength = newLength
      leftPointer -= 1
      rightPointer += 1
    return (result, resultLength)