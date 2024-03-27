"""
212. Word Search II
Hard
Topics
Companies
Hint
Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

 

Example 1:


Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
Example 2:


Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
 

Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 12
board[i][j] is a lowercase English letter.
1 <= words.length <= 3 * 10^4
1 <= words[i].length <= 10
words[i] consists of lowercase English letters.
All the strings of words are unique.

"""
from typing import List

class TrieNode:
  def __init__(self):
    self.children = {}
    self.isWord = False #will be True if this node marks the end of a word
    self.refs = 0
  
  def addWord(self, word):
    cur = self
    for c in word:
      if c not in cur.children:
        cur.children[c] = TrieNode()
      cur = cur.children[c] #continue with next char node
    cur.isWord = True
    
class Solution:
  def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
    root = TrieNode()
    for w in words:
      root.addWord(w)
    
    ROWS = len(board)
    COLS = len(board[0])
    res = set()
    visit = set() #avoid looping to the same cell in one search

    def dfs(r, c, previousNode, word):
      if(
        #out of bounds
        r < 0
        or c < 0
        or r == ROWS
        or c == COLS
        #or the character in this matrix cell is not in any searched words
        or board[r][c] not in previousNode.children 
        #or the cell is already visited
        or (r,c) in visit
      ):
        return #skip processing from this cell
      
      #process the cell
      visit.add((r,c))
      processedNode = previousNode.children[board[r][c]] #go to the TrieNode for the current processed cell 
      word += board[r][c]
      if processedNode.isWord:
        res.add(word) #found a word
      
      #continue checking the neighbors of this cell
      dfs(r+1,c,processedNode,word)
      dfs(r-1,c,processedNode,word)
      dfs(r,c+1,processedNode,word)
      dfs(r,c-1,processedNode,word)

      visit.remove((r,c))
    
    #start search from all cells in the matrix
    for r in range(ROWS):
      for c in range(COLS):
        dfs(r,c,root,"")
    
    return list(res)