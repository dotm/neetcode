class Solution:
  def checkInclusion(self, s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
      return False
    
    subset = {}
    for char in s1:
      if char not in subset: subset[char] = 0
      subset[char] = subset[char] + 1
    
    for rightPointer in range(len(s1), len(s2)+1):
      superset = {}
      leftPointer = rightPointer - len(s1)
      substr = s2[leftPointer:rightPointer]
      for char in substr:
        if char not in superset: superset[char] = 0
        superset[char] = superset[char] + 1
      if subset == superset:
        return True
    return False