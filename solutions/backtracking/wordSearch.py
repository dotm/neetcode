"""
79. Word Search
Medium
14.7K
605
Companies
Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

 

Example 1:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
 

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.
 

Follow up: Could you use search pruning to make your solution faster with a larger board?
"""
from typing import List

class Solution:
  def exist(self, board: List[List[str]], word: str) -> bool:
    rows = len(board)
    cols = len(board[0])
    visitedPathSet = set()
    
    def dfsBacktrack(rowPointer, colPointer, wordPointer):
      if wordPointer == len(word):
        return True # word found (stop searching through this path)
      
      pointerOutOfBound = rowPointer < 0 or colPointer < 0 or rowPointer >= rows or colPointer >= cols
      if pointerOutOfBound:
        return False # stop searching through this path
      
      differentCharFound = word[wordPointer] != board[rowPointer][colPointer]
      charAlreadyVisited = (rowPointer, colPointer) in visitedPathSet
      if differentCharFound or charAlreadyVisited:
        return False # stop searching through this path
      
      # continue searching through this path
      visitedPathSet.add((rowPointer, colPointer))
      #search all 4 directions and immediately return if True to save computing time
      if dfsBacktrack(rowPointer+1, colPointer, wordPointer+1):
        return True
      if dfsBacktrack(rowPointer-1, colPointer, wordPointer+1):
        return True
      if dfsBacktrack(rowPointer, colPointer+1, wordPointer+1):
        return True
      if dfsBacktrack(rowPointer, colPointer-1, wordPointer+1):
        return True
      visitedPathSet.remove((rowPointer, colPointer))
      return False
    
    # To prevent Time Limit Exceeded,reverse the word if frequency of the first letter is more than the last letter's
    # count = defaultdict(int, sum(map(Counter, board), Counter()))
    # if count[word[0]] > count[word[-1]]:
    #     word = word[::-1]

    #start backtracking from all cells
    for rowPointer in range(rows):
      for colPointer in range(cols):
        if dfsBacktrack(rowPointer, colPointer, 0):
          return True
    return False