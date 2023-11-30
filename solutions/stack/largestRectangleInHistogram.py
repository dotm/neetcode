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