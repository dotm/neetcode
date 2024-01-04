"""
763. Partition Labels
Medium
10K
373
Companies
You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.

 

Example 1:

Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
Example 2:

Input: s = "eccbbbbdec"
Output: [10]
 

Constraints:

1 <= s.length <= 500
s consists of lowercase English letters.
"""
from typing import List
class Solution:
  def partitionLabels(self, s: str) -> List[int]:
    lastIndexOfChar = {}
    for i in range(len(s)):
      char = s[i]
      lastIndexOfChar[char] = i
    
    result = []
    i = 0
    currentPartitionLength = 0
    endOfCurrentPartitionIndex = 0
    while i < len(s):
      char = s[i]
      endOfCurrentPartitionIndex = max(endOfCurrentPartitionIndex, lastIndexOfChar[char])
      currentPartitionLength += 1
      if endOfCurrentPartitionIndex == i:
        #can cut partition at index i
        result.append(currentPartitionLength)
        currentPartitionLength = 0
      i+=1
    
    return result
