"""
416. Partition Equal Subset Sum
Solved
Medium
Topics
Companies
Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

 

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100
"""
from typing import List

class Solution:
  def canPartition(self, nums: List[int]) -> bool:
    sumIsOdd = (sum(nums) % 2) == 1
    if sumIsOdd:
      return False
    
    possibleSum = set()
    possibleSum.add(0) #you can always sum up to 0 if you add nothing to the partition
    target = sum(nums) // 2

    for i in range(len(nums)):
      nextPossibleSum = set()
      for s in possibleSum:
        if (s + nums[i]) == target:
          return True #can partition to equal subset
        nextPossibleSum.add(s) #rebuild current possibleSum
        nextPossibleSum.add(s+nums[i]) #also add new possibleSum
      possibleSum = nextPossibleSum #go to next iteration
    return False