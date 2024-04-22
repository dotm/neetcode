"""
Kadane's algorithm is a greedy/dynamic programming algorithm that can be used on array problems to bring the time complexity down to 
O(n). It is used to calculate the maximum sum subarray ending at a particular position.

Q: Find a non-empty subarray with the largest sum.
Solution: when the current running sum is negative number, reset the sum to 0
"""

def kadanesAlgo(nums):
  maxSum = nums[0]
  curSum = 0

  for n in nums:
    curSum = max(curSum, 0) #reset to 0 if n from previous iteration make sum to become negative
    curSum += n
    maxSum = max(maxSum, curSum)
  return maxSum

def slidingWindow(nums): #to keep track of the boundaries that results in the max sum
  maxSum = nums[0]
  curSum = 0
  maxL, maxR = 0, 0
  L = 0

  for R in range(len(nums)):
    if curSum < 0:
      curSum = 0  #reset to 0 if n from previous iteration make sum to become negative
      L = R       #also reset the window boundaries

    curSum += nums[R]
    if curSum > maxSum:
      maxSum = curSum
      maxL, maxR = L, R 

  return [maxL, maxR]