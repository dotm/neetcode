"""
115. Distinct Subsequences
Solved
Hard
Topics
Companies
Given two strings s and t, return the number of distinct subsequences of s which equals t.

The test cases are generated so that the answer fits on a 32-bit signed integer.

 

Example 1:

Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit
Example 2:

Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag
 

Constraints:

1 <= s.length, t.length <= 1000
s and t consist of English letters.
"""

class Solution:
  def numDistinct(self, s: str, t: str) -> int:
    cache = {}
    def dfs(i,j): #index of s and t
      if j == len(t):
        return 1 #found a match
      if i == len(s):
        return 0
      if (i,j) in cache:
        return cache[(i,j)]
      
      if s[i] == t[j]:
        #get the result of choosing and not choosing the current target char
        cache[(i,j)] = dfs(i+1,j+1) + dfs(i+1,j)
      else:
        #can only choose to not use the current target char (because it doesn't match the s char)
        cache[(i,j)] = dfs(i+1,j)
      return cache[(i,j)]
    return dfs(0,0)
