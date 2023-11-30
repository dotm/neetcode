class Solution:
  def characterReplacement(self, s: str, k: int) -> int:
    charToCountMap = {}
    currentMaxCount = 0
    result = 0
    leftBoundary = 0
    # rightBoundary = 0

    for rightBoundary in range(len(s)):
      #store new char from the right side inside the map
      newChar = s[rightBoundary]
      charToCountMap[newChar] = charToCountMap.get(newChar, 0) + 1
      newCount = charToCountMap[newChar]

      #update new max count if necessary
      if newCount > currentMaxCount:
        currentMaxCount = newCount
      
      windowSize = rightBoundary - leftBoundary + 1
      
      #update result if necessary
      newResult = min(windowSize, currentMaxCount + k)
      result = max(result, newResult)

      #move left boundary if necessary
      if currentMaxCount + k < windowSize:
        removedChar = s[leftBoundary]
        charToCountMap[removedChar] = charToCountMap.get(removedChar, 0) - 1
        leftBoundary +=1

    return result