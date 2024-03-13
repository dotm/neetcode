"""
97. Interleaving String
Medium
Topics
Companies
Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where s and t are divided into n and m 
substrings
 respectively, such that:

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.

 

Example 1:


Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.
Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
Example 3:

Input: s1 = "", s2 = "", s3 = ""
Output: true
 

Constraints:

0 <= s1.length, s2.length <= 100
0 <= s3.length <= 200
s1, s2, and s3 consist of lowercase English letters.
 

Follow up: Could you solve it using only O(s2.length) additional memory space?
"""

class Solution:
  def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
    if len(s1) + len(s2) != len(s3):
      return False
    
    cache = [[False] * (len(s2)+1) for i in range(len(s1)+1)]
    
    cache[len(s1)][len(s2)] = True
    #because if we reached end of both s1 and s2,
    #that means we successfully interleaved both string (isInterleave is True)

    for i in range(len(s1), -1, -1):
      for j in range(len(s2), -1, -1):
        if i < len(s1) and s1[i] == s3[i+j] and cache[i+1][j]:
          #if i is inbound and we can use the char from s1 to interleave
          cache[i][j] = True
        if j < len(s2) and s2[j] == s3[i+j] and cache[i][j+1]:
          #if j is inbound and we can use the char from s2 to interleave
          cache[i][j] = True
    return cache[0][0]