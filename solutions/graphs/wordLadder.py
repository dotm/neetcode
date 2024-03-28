"""
127. Word Ladder
Hard
Topics
Companies
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

 

Example 1:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
Example 2:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
 

Constraints:

1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.
"""
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
    
    #find word ladder
    visited = set([beginWord])
    queue = deque([beginWord])
    steps = 1
    while queue:
      for i in range(len(queue)):
        word = queue.popleft()
        if word == endWord:
          return steps #endWord found. return total steps
        #BFS on neighbors map
        for j in range(len(word)):
          pattern = word[:j] + "*" + word[j+1:]
          for neighborWord in neighbors[pattern]:
            if neighborWord in visited:
              continue #skip the current word and already visited word
            visited.add(neighborWord)
            queue.append(neighborWord)
      steps += 1
    return 0 #endWord can't be reached from beginWord
            