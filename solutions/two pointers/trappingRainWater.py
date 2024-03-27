"""
42. Trapping Rain Water
Hard

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example 1:


Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
 

Constraints:

n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5
"""
from typing import List

class Solution:
  def trap(self, height: List[int]) -> int:
    if len(height) < 3:
      #can't trap water with less than 3
      return 0
    
    leftPointerIndex = 0
    rightPointerIndex = len(height)-1
    leftMaxHeight = 0
    rightMaxHeight = 0
    
    trappedWater = 0
    while (leftPointerIndex + 1) < rightPointerIndex:
      leftMaxHeight = max(leftMaxHeight, height[leftPointerIndex])
      rightMaxHeight = max(rightMaxHeight, height[rightPointerIndex])

      lowestHeightOfBothSide = -1
      heightOfWater = -1
      if leftMaxHeight < rightMaxHeight:
        lowestHeightOfBothSide = leftMaxHeight
        leftPointerIndex += 1
        heightOfWater = max(0, lowestHeightOfBothSide - height[leftPointerIndex])
      else:
        lowestHeightOfBothSide = rightMaxHeight
        rightPointerIndex -= 1
        heightOfWater = max(0, lowestHeightOfBothSide - height[rightPointerIndex])
      trappedWater += heightOfWater
    
    return trappedWater

print(Solution().trap([0,1,0,2,1,0,1,3,2,1,2,1]))