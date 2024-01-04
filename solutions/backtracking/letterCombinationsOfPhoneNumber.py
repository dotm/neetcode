"""
17. Letter Combinations of a Phone Number
Medium
17.6K
922
Companies
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.


 

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]
 

Constraints:

0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].
"""
from typing import List

class Solution:
  def letterCombinations(self, digits: str) -> List[str]:
    if len(digits) == 0:
      return []
    
    result = []
    digitToLettersMap = {
      "2": "abc",
      "3": "def",
      "4": "ghi",
      "5": "jkl",
      "6": "mno",
      "7": "pqrs",
      "8": "tuv",
      "9": "wxyz",
    }
    
    def backtrack(digitPointer, currentStr):
      if len(currentStr) == len(digits):
        #used all digits
        result.append(currentStr)
        return
      for char in digitToLettersMap[digits[digitPointer]]:
        #backtrack all possible characters of the next digit
        backtrack(digitPointer+1, currentStr+char)

    backtrack(0,"")
    return result
