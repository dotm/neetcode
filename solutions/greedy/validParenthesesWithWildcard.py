"""
678. Valid Parenthesis String (Valid Parentheses with Wildcard)
Medium
5K
128
Companies
Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "(*)"
Output: true
Example 3:

Input: s = "(*))"
Output: true
 

Constraints:

1 <= s.length <= 100
s[i] is '(', ')' or '*'.
"""
class Solution:
  def checkValidString(self, s: str) -> bool:
    minUnclosedLeftParen = 0
    maxUnclosedLeftParen = 0
    for char in s:
      if char == "(":
        minUnclosedLeftParen += 1
        maxUnclosedLeftParen += 1
      elif char == ")":
        minUnclosedLeftParen -= 1
        maxUnclosedLeftParen -= 1
      else:
        #add distance between min and max
        #because the decision tree create multiple possibilities: (, "", )
        minUnclosedLeftParen -= 1 #the * becomes ) here
        maxUnclosedLeftParen += 1 #the * becomes ( here

      if maxUnclosedLeftParen < 0:
        #can't be valid string if more ) is found than (
        return False
      elif minUnclosedLeftParen < 0:
        #ignore the possibility that turn one of the * into )
        #by changing the * to turn into ""
        #example: *()
        minUnclosedLeftParen = 0
    return minUnclosedLeftParen == 0 #there's a possibility that all paren are closed