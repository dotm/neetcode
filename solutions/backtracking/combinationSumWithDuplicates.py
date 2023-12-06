"""
40. Combination Sum II
Medium
9.9K
261
Companies
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

 

Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
Example 2:

Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]
 

Constraints:

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
"""
from typing import List

class Solution:
  def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
    res = []
    candidates.sort() #to make it easier to skip duplicates

    def backtrack(currentCombination, candidatePointer, target):
      if target == 0:
        #reached a combination that achieves the targe
        res.append(currentCombination.copy()) #copy the subset to pass by value
        return
      elif target < 0:
        #overshoot the target (stop backtracking)
        return
      
      previousIndexValue = float('-Infinity')
      for i in range(candidatePointer, len(candidates)):
        if candidates[i] == previousIndexValue:
          continue
        currentCombination.append(candidates[i])
        #backtrack all subsets that includes candidates[i]
        backtrack(currentCombination, i+1, target - candidates[i])
        #backtrack all subsets that don't include candidates[i]
        currentCombination.pop()
        previousIndexValue = candidates[i]
    
    backtrack([],0,target)
    return res
