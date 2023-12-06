"""
424. Longest Repeating Character Replacement
Medium
9.8K
437
Companies
You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

 

Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
 

Constraints:

1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length
"""
class Solution:
  def characterReplacement(self, s: str, k: int) -> int:
    charToCountMap = {}
    currentMaxCount = 0
    result = 0
    leftBoundary = 0
    # rightBoundary = 0

    for rightBoundary in range(len(s)):
      #store new char from the right side inside the map
      newChar = s[rightBoundary]
      charToCountMap[newChar] = charToCountMap.get(newChar, 0) + 1
      newCount = charToCountMap[newChar]

      #update new max count if necessary
      if newCount > currentMaxCount:
        currentMaxCount = newCount
      
      windowSize = rightBoundary - leftBoundary + 1
      
      #update result if necessary
      newResult = min(windowSize, currentMaxCount + k)
      result = max(result, newResult)

      #move left boundary if necessary
      if currentMaxCount + k < windowSize:
        removedChar = s[leftBoundary]
        charToCountMap[removedChar] = charToCountMap.get(removedChar, 0) - 1
        leftBoundary +=1

    return result