"""
131. Palindrome Partitioning
Medium
12K
393
Companies
Given a string s, partition s such that every 
substring
 of the partition is a 
palindrome
. Return all possible palindrome partitioning of s.

 

Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]
 

Constraints:

1 <= s.length <= 16
s contains only lowercase English letters.
"""
from typing import List

class Solution:
  def partition(self, s: str) -> List[List[str]]:
    result = []
    currentPartition = []
    
    def dfsBacktrack(stringPointer):
      if stringPointer >= len(s):
        #if reach the end (because all substring is palindrome)
        #then add current partition to result
        result.append(currentPartition.copy())
        return
      for rightPointer in range(stringPointer, len(s)):
        if self.subStringIsPalindrome(s, stringPointer, rightPointer):
          currentPartition.append(s[stringPointer:rightPointer+1])
          dfsBacktrack(rightPointer+1) #continue backtrack from next char
          currentPartition.pop()
        #else: stop searching current partition
    
    dfsBacktrack(0) #start backtrack from first char
    return result

  def subStringIsPalindrome(self, fullString, leftPointer, rightPointer):
    while leftPointer < rightPointer:
      if(fullString[leftPointer] != fullString[rightPointer]):
        return False
      else:
        #continue next iteration
        leftPointer += 1
        rightPointer -= 1
    return True
