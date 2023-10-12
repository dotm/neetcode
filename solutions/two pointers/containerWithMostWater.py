from typing import List

class Solution:
  def maxArea(self, height: List[int]) -> int:
    leftPointerIndex = 0
    rightPointerIndex = len(height) - 1
    area = 0

    while leftPointerIndex < rightPointerIndex:
      leftHeight = height[leftPointerIndex]
      rightHeight = height[rightPointerIndex]
      area = max(
        area,
        (rightPointerIndex-leftPointerIndex) * min(leftHeight, rightHeight)
      )

      if leftHeight < rightHeight:
        leftPointerIndex += 1
      else:
        rightPointerIndex -= 1
    
    return area
