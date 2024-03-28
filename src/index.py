from typing import List
from collections import defaultdict
from collections import deque

class Solution:
  def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
    if endWord not in wordList:
      return 0
    
    #construct neighbors map
    neighbors = defaultdict(list) #{ "h*t" : [hot,hit,hat] }
    wordList.append(beginWord)
    for word in wordList:
      #insert the word into the neighbors map for every possible wildcard position
      for j in range(len(word)):
        pattern = word[:j] + "*" + word[j+1:]
        neighbors[pattern].append(word)
    print(neighbors)
    #find word ladder
    visited = set([beginWord])
    queue = deque([beginWord])
    res = 1
    while queue:
      for i in range(len(queue)):
        word = queue.popleft()
        if word == endWord:
          return res
        #BFS on neighbors map
        for j in range(len(word)):
          pattern = word[:j] + "*" + word[j+1:]
          print(pattern)
          for neighborWord in neighbors[pattern]:
            if neighborWord in visited:
              continue #skip the current word and already visited word
            visited.add(neighborWord)
            queue.append(neighborWord)
      res += 1
    return 0
            
print(Solution().ladderLength("hot","dog",["hot","dog"]))