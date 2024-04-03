"""
892 · Alien Dictionary (Topological Sort)
Hard

Description
There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of non-empty words from the dictionary, where words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.

You may assume all letters are in lowercase.
The dictionary is invalid, if string a is prefix of string b and b is appear before a.
If the order is invalid, return an empty string.
There may be multiple valid order of letters, return the smallest in normal lexicographical order.
The letters in one string are of the same rank by default and are sorted in Human dictionary order.
Example
Example 1:

Input: ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
Explanation: 
from "wrt"and"wrf" ,we can get 't'<'f'
from "wrt"and"er" ,we can get 'w'<'e'
from "er"and"ett" ,we can get 'r'<'t'
from "ett"and"rftt" ,we can get 'e'<'r'
So return "wertf"
Example 2:

Input: ["z","x"]
Output: "zx"
Explanation: 
from "z" and "x", we can get 'z' < 'x'
So return "zx"
"""
from typing import List

class Solution:
  def alienOrder(self, words: List[str]) -> str:
    adjacencyList = {char: set() for word in words for char in word} #{character: characters greater than the character in the key}

    for i in range(len(words) - 1):
      word1, word2 = words[i], words[i + 1]
      minLength = min(len(word1), len(word2))
      if len(word1) > len(word2) and word1[:minLength] == word2[:minLength]: #word1 is prefix of word2 (but is less than word2)
        return "" #invalid order. early return
      for j in range(minLength):
        if word1[j] != word2[j]: #iterate word1 and word2 until we found mismatched character
          adjacencyList[word1[j]].add(word2[j]) #add the greater character as value to the adjacencyList
          break #stop iterating for these words and continue to the next word1 and word2

    visited = {}  # {char: bool} False means visited, True means is in current path (to avoid cycles in the graph)
    result = []

    def dfs(char):
      if char in visited:
        return visited[char] #early return if already visited (False) or found cycle (True)

      visited[char] = True

      for neighChar in adjacencyList[char]:
        if dfs(neighChar): #found cycle
          return True

      visited[char] = False
      result.append(char) #post order DFS (add from the child toward the parent for the result)

    for char in adjacencyList:
      if dfs(char): #found cycle
        return "" #invalid ordering. early return

    result.reverse() #because we used post order DFS
    return "".join(result)