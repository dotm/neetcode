from typing import List

class Solution:
  def search(self, nums: List[int], target: int) -> int:
    leftPointer = 0
    rightPointer = len(nums)-1

    while leftPointer <= rightPointer:
      midPointer = (leftPointer + rightPointer) // 2
      midValue = nums[midPointer]
      if midValue == target:
        return midPointer
      
      listNotRotated = nums[leftPointer] < nums[rightPointer]
      if listNotRotated:
        #do usual binary search
        if midValue < target:
          leftPointer = midPointer + 1
        elif midValue > target:
          rightPointer = midPointer - 1
        # midValue == target already handled above
      else: #list is rotated
        midIsPartOfBiggerValues = nums[midPointer] >= nums[leftPointer]
        midIsPartOfSmallerValues = not midIsPartOfBiggerValues
        
        if midValue < target:
          if midIsPartOfBiggerValues: # [4,5,6,7,8,1,2] mid:7 target:8
            leftPointer = midPointer + 1
          else:
            if nums[leftPointer] <= target: # [6,0,1,2,3,4,5] mid:2 target:6
              rightPointer = midPointer - 1
            elif nums[rightPointer] >= midValue: # [6,0,1,2,3,4,5] mid:2 target:4
              leftPointer = midPointer + 1
            else:
              return -1
        elif midValue > target: # [6,0,1,2,3,4,5] mid:2 target:3
          if midIsPartOfSmallerValues:
            rightPointer = midPointer - 1
          else:
            if nums[leftPointer] <= midValue: # [4,5,6,7,8,1,2] mid:7 target:5
              rightPointer = midPointer - 1
            elif nums[rightPointer] >= midValue: # [4,5,6,7,8,1,2] mid:7 target:2
              leftPointer = midPointer + 1
            else:
              return -1
        # midValue == target already handled above
    
    return -1