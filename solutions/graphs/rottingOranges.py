"""
994. Rotting Oranges
Medium
12.1K
375
Companies
You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

 

Example 1:


Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Example 2:

Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
Example 3:

Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] is 0, 1, or 2.
"""
from typing import List
import collections

class Solution:
  def orangesRotting(self, grid: List[List[int]]) -> int:
    queue = collections.deque() #queue of (row,col)
    freshOrangeCount = 0
    time = 0

    rowCount = len(grid)
    colCount = len(grid[0])
    for row in range(rowCount):
      for col in range(colCount):
        if grid[row][col] == 1:
          freshOrangeCount += 1
        if grid[row][col] == 2:
          queue.append((row, col))

    directions = [(0,1),(0,-1),(1,0),(-1,0)] #right,left,up,down
    while freshOrangeCount > 0 and queue:
      #finish if all oranges has rot or if there's no more orange to rot
      
      length = len(queue)
      for i in range(length):
        row,col = queue.popleft()
        for dr,dc in directions:
          nextRow = row + dr
          nextCol = col + dc
          
          notOutOfBounds = nextRow >= 0 and nextRow < rowCount and nextCol >= 0 and nextCol < colCount
          if notOutOfBounds:
            nextCellIsFresh = grid[nextRow][nextCol] == 1
            if nextCellIsFresh:
              grid[nextRow][nextCol] = 2
              queue.append((nextRow,nextCol))
              freshOrangeCount -= 1
      time += 1
    
    return time if freshOrangeCount == 0 else -1