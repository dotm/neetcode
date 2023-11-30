from typing import List
import math as math

class Solution:
  def findMin(self, nums: List[int]) -> int:
    leftPointer = 0
    rightPointer = len(nums) - 1
    result = math.inf

    if nums[leftPointer] < nums[rightPointer]:
      return nums[leftPointer]
    
    while leftPointer <= rightPointer:
      midPointer = (rightPointer + leftPointer) // 2
      result = min(result, nums[midPointer])
      
      midIsPartOfBiggerValues = nums[midPointer] >= nums[leftPointer] and nums[leftPointer] > nums[rightPointer]
      if midIsPartOfBiggerValues:
        leftPointer = midPointer + 1
      else:
        rightPointer = midPointer - 1
    
    return result

print(Solution().findMin([2,1]))