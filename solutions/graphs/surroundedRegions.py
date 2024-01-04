"""
130. Surrounded Regions
Medium
8.2K
1.7K
Companies
Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

 

Example 1:


Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation: Notice that an 'O' should not be flipped if:
- It is on the border, or
- It is adjacent to an 'O' that should not be flipped.
The bottom 'O' is on the border, so it is not flipped.
The other three 'O' form a surrounded region, so they are flipped.
Example 2:

Input: board = [["X"]]
Output: [["X"]]
 

Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 200
board[i][j] is 'X' or 'O'.
"""
from typing import List

class Solution:
  def solve(self, board: List[List[str]]) -> None:
    """
    Do not return anything, modify board in-place instead.
    """
    rowCount = len(board)
    colCount = len(board[0])

    def dfs(row, col):
      outOfBounds = row < 0 or col < 0 or row == rowCount or col == colCount
      if outOfBounds or board[row][col] != "O":
        return
      board[row][col] = "M" #marked as uncapturable
      dfs(row+1,col)
      dfs(row-1,col)
      dfs(row,col+1)
      dfs(row,col-1)
    for row in range(rowCount):
      for col in range(colCount):
        cellIsAtTheEdgeOfMatrix = row == 0 or row == rowCount-1 or col == 0 or col == colCount-1
        if board[row][col] == "O" and cellIsAtTheEdgeOfMatrix:
          dfs(row, col) #mark as uncapturable
    
    for row in range(rowCount):
      for col in range(colCount):
        #capture cells that are capturable (not marked)
        if board[row][col] == "O":
          board[row][col] = "X"
    
    for row in range(rowCount):
      for col in range(colCount):
        #reverse mark of uncapturable cells
        if board[row][col] == "M":
          board[row][col] = "O"