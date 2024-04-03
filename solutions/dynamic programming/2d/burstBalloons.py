"""
312. Burst Balloons
Solved
Hard
Topics
Companies
You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.

If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.

 

Example 1:

Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
Example 2:

Input: nums = [1,5]
Output: 10
 

Constraints:

n == nums.length
1 <= n <= 300
0 <= nums[i] <= 100
"""
from typing import List

class Solution:
  def maxCoins_topDownMemoization(self, nums: List[int]) -> int:
    nums = [1] + nums + [1] #add 1 on the edges of nums
    dpCache = {} #cache {(l,r): max coin for this left and right boundaries}
    def dfs(left,right):
      if left > right: #can't iterate. invalid left and right boundaries
        return 0
      if (left,right) in dpCache:
        return dpCache[(left,right)]

      dpCache[(left,right)] = 0 #max coins for the subproblem with particular left and right boundaries
      for i in range(left, right+1): #iterate over all balloons inside the left right boundaries
        #the coins we get when we pop balloons at i
        coins = nums[left-1] * nums[i] * nums[right+1]

        #the sum of max coins we get for the left and right sections separated by i
        coins += dfs(left,i-1) + dfs(i+1,right)

        dpCache[(left,right)] = max(dpCache[(left,right)], coins) #store the max coins
      return dpCache[(left,right)]
    return dfs(1,len(nums)-2) #run dfs on nums (without the 1s at the edges)
  
  def maxCoins_bottomUpDynamicProgramming(self, nums: List[int]) -> int:
    cache = {}
    nums = [1] + nums + [1]

    for offset in range(2, len(nums)):
      for left in range(len(nums) - offset):
        right = left + offset
        for pivot in range(left + 1, right):
          coins = nums[left] * nums[pivot] * nums[right]
          coins += cache.get((left, pivot), 0) + cache.get((pivot, right), 0)
          cache[(left, right)] = max(coins, cache.get((left, right), 0))
    return cache.get((0, len(nums) - 1), 0)
