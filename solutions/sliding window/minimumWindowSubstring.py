class Solution:
  def minWindow(self, s: str, t: str) -> str:
    if len(t) > len(s):
      return ""
    
    subset = {}
    for char in t:
      if char not in subset: subset[char] = 0
      subset[char] = subset[char] + 1
    
    leftPointer = 0
    superset = {}
    resultLen = float('infinity')
    resultStr = ""
    for rightPointer in range(len(s)):
      addedChar = s[rightPointer]
      if addedChar in subset: #is relevant character
        
        #insert character to superset
        if addedChar not in superset:
          superset[addedChar] = 0
        superset[addedChar] = superset[addedChar] + 1

        #check is substring possibility
        if subset[addedChar] == superset[addedChar]:
          isSubstring = True
          while isSubstring:
            #check is substring
            for subsetChar in subset:
              if subset[subsetChar] > superset.get(subsetChar, -1):
                isSubstring = False
            if isSubstring:
              #record result
              newLen = (rightPointer + 1) - leftPointer
              if newLen < resultLen:
                resultLen = newLen
                resultStr = s[leftPointer:rightPointer+1]
              #remove leftmost character
              removedChar = s[leftPointer]
              if removedChar in subset: #is relevant character
                superset[removedChar] = superset[removedChar] - 1
              leftPointer += 1

    return resultStr