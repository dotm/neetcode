from typing import List

class Solution:
  def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
    result = [0] * len(temperatures)
    stack = [] #[(index, value)]

    for tempIndex, tempValue in enumerate(temperatures):
      while stack:
        prevTemp = stack[-1]
        prevTempValue = prevTemp[1]
        if tempValue > prevTempValue:
          prevTempIndex = prevTemp[0]
          result[prevTempIndex] = tempIndex - prevTempIndex
          stack.pop()
        else:
          break #because the previous element will be even hotter (higher value)
      stack.append((tempIndex, tempValue))
    
    return result