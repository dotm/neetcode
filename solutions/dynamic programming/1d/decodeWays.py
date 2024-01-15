"""
91. Decode Ways
Solved
Medium
Topics
Companies
A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

The test cases are generated so that the answer fits in a 32-bit integer.

 

Example 1:

Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
Example 3:

Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
 

Constraints:

1 <= s.length <= 100
s contains only digits and may contain leading zero(s).
"""
class Solution:
  def numDecodingsMemoization(self, s: str) -> int:
    dp = {len(s): 1}

    def dfs(i):
      if i in dp:
        return dp[i]
      if s[i] == "0":
        return 0

      res = dfs(i + 1)
      if i + 1 < len(s) and (
        s[i] == "1" or s[i] == "2" and s[i + 1] in "0123456"
      ):
        res += dfs(i + 2)
      dp[i] = res
      return res

    return dfs(0)

  def numDecodingsDynamicProgramming(self, s: str) -> int:
    # Dynamic Programming
    dp = {len(s): 1} #cache
    for i in range(len(s) - 1, -1, -1): #walk backward
      if s[i] == "0":
        dp[i] = 0
      else:
        dp[i] = dp[i+1] #same result as one step ahead
      
      canDecodeTwoNumber = i+1 < len(s) and (
        s[i] == "1" or (s[i] == "2" and s[i+1] in "0123456")
      )
      if canDecodeTwoNumber:
        dp[i] += dp[i+2] #also add the result from two step ahead
    return dp[0]
  
  def numDecodingsDynamicProgrammingOptimized(self, s: str) -> int:
    # Dynamic Programming
    if len(s) == 0 or s == "0":
      return 0
    if len(s) == 1:
      return 1

    #use accumulators
    leftAcc = 0 #result
    midAcc = 0 #one step ahead
    rightAcc = 0 #two steps ahead
    for i in range(len(s) - 1, -1, -1): #walk backward
      rightAcc = midAcc
      midAcc = leftAcc
      if s[i] == "0":
        leftAcc = 0
      else:
        leftAcc = midAcc if i+1 < len(s) else 1
      
      canDecodeTwoNumber = i+1 < len(s) and (
        s[i] == "1" or (s[i] == "2" and s[i+1] in "0123456")
      )
      if canDecodeTwoNumber:
        leftAcc += rightAcc if i+2 < len(s) else 1
    return leftAcc