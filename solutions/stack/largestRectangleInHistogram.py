"""
84. Largest Rectangle in Histogram
Hard
16.3K
238
Companies
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

 

Example 1:


Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
Example 2:


Input: heights = [2,4]
Output: 4
 

Constraints:

1 <= heights.length <= 105
0 <= heights[i] <= 104
"""
from typing import List

class Solution:
  def largestRectangleArea(self, heights: List[int]) -> int:
    maxArea = 0
    stack = [] #[(index, height)]

    for currentBarIndex, currentBarHeight in enumerate(heights):
      currentBarRectStartsFrom = currentBarIndex
      while stack and stack[-1][1] > currentBarHeight:
        #while previousBarHeight > currentBarHeight
        previousBarStartIndex, previousBarHeight = stack.pop()
        #move the start point of current bar
        currentBarRectStartsFrom = previousBarStartIndex
        #calculate previous bar's max area before totally forgetting about it
        previousBarLength = currentBarIndex - previousBarStartIndex
        maxArea = max(maxArea, previousBarHeight * previousBarLength)
      stack.append((currentBarRectStartsFrom, currentBarHeight))
    
    #calculate areas for remaining bars in stack
    for currentBarStartIndex, currentBarHeight in stack:
      currentBarLength = len(heights) - currentBarStartIndex
      maxArea = max(maxArea, currentBarHeight * currentBarLength)
    
    return maxArea