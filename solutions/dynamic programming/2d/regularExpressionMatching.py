

class Solution:
  #s is string. p is pattern
  def isMatch_topDownMemoization(self, s: str, p: str) -> bool:
    cache = {}

    def dfs(stringIndex, patternIndex):
      if (stringIndex, patternIndex) in cache:
        return cache[(stringIndex, patternIndex)]
      if stringIndex >= len(s) and patternIndex >= len(p): #finish iterating both string and pattern
        return True #means the pattern matches the string
      if patternIndex >= len(p): #pattern characters exhausted but there's still uncovered characters in string
        return False #means the pattern doesn't match the string

      match = (
        stringIndex < len(s) #check index not out of bounds
        and (s[stringIndex] == p[patternIndex] or p[patternIndex] == ".") #check if string and pattern matches or pattern has wildcard "."
      )

      if (
        (patternIndex + 1) < len(p) #check index not out of bounds
        and p[patternIndex + 1] == "*" #check if pattern will have "*" wildcard
      ):
        cache[(stringIndex, patternIndex)] = (
          dfs(stringIndex, patternIndex + 2) #check if we can match without using the "*" wildcard
          or (
            match #only allows the next dfs if characters matched
            and dfs(stringIndex + 1, patternIndex) #check if we can match using the "*" wildcard
          )
        )
        return cache[(stringIndex, patternIndex)]
      
      if match: #if match but pattern doesn't have "*" wildcard on the next index
        cache[(stringIndex, patternIndex)] = dfs(stringIndex + 1, patternIndex + 1) #continue with the next indices for both string and pattern
        return cache[(stringIndex, patternIndex)]
      
      cache[(stringIndex, patternIndex)] = False #doesn't match and doesn't have any wildcards
      return False

    return dfs(0, 0) #start dfs at the start of both string and pattern

  def isMatch_bottomUpDynamicProgramming(self, s: str, p: str) -> bool:
    cache = [[False] * (len(p) + 1) for i in range(len(s) + 1)]
    cache[len(s)][len(p)] = True

    for stringIndex in range(len(s), -1, -1):
      for patternIndex in range(len(p) - 1, -1, -1):
        match = stringIndex < len(s) and (s[stringIndex] == p[patternIndex] or p[patternIndex] == ".")

        if (patternIndex + 1) < len(p) and p[patternIndex + 1] == "*":
          cache[stringIndex][patternIndex] = cache[stringIndex][patternIndex + 2]
          if match:
            cache[stringIndex][patternIndex] = cache[stringIndex + 1][patternIndex] or cache[stringIndex][patternIndex]
        elif match:
          cache[stringIndex][patternIndex] = cache[stringIndex + 1][patternIndex + 1]
    return cache[0][0]
