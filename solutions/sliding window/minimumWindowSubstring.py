"""
76. Minimum Window Substring
Hard
16.6K
677
Companies
Given two strings s and t of lengths m and n respectively, return the minimum window 
substring
 of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 

Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.
 

Follow up: Could you find an algorithm that runs in O(m + n) time?
"""
class Solution:
  def minWindow(self, s: str, t: str) -> str:
    if len(t) > len(s):
      return ""
    
    subset = {}
    for char in t:
      if char not in subset: subset[char] = 0
      subset[char] = subset[char] + 1
    
    leftPointer = 0
    superset = {}
    resultLen = float('infinity')
    resultStr = ""
    for rightPointer in range(len(s)):
      addedChar = s[rightPointer]
      if addedChar in subset: #is relevant character
        
        #insert character to superset
        if addedChar not in superset:
          superset[addedChar] = 0
        superset[addedChar] = superset[addedChar] + 1

        #check is substring possibility
        if subset[addedChar] == superset[addedChar]:
          isSubstring = True
          while isSubstring:
            #check is substring
            for subsetChar in subset:
              if subset[subsetChar] > superset.get(subsetChar, -1):
                isSubstring = False
            if isSubstring:
              #record result
              newLen = (rightPointer + 1) - leftPointer
              if newLen < resultLen:
                resultLen = newLen
                resultStr = s[leftPointer:rightPointer+1]
              #remove leftmost character
              removedChar = s[leftPointer]
              if removedChar in subset: #is relevant character
                superset[removedChar] = superset[removedChar] - 1
              leftPointer += 1

    return resultStr