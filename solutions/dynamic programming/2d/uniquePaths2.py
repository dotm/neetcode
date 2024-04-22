"""
63. Unique Paths II
Solved
Medium

You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The testcases are generated so that the answer will be less than or equal to 2 * 10^9.

Example 1:
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
Example 2:


Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
 

Constraints:

m == obstacleGrid.length
n == obstacleGrid[i].length
1 <= m, n <= 100
obstacleGrid[i][j] is 0 or 1.
"""
from typing import List

class Solution:
  def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
    rowCount = len(obstacleGrid)
    colCount = len(obstacleGrid[0])
    resultMatrix = [[0 for _ in range(colCount)] for _ in range(rowCount)]
    if obstacleGrid[rowCount-1][colCount-1] == 1:
      return 0 #no path because exit is blocked
    
    for rowIndex in range(rowCount - 1, -1, -1):  # Iterate rows from bottom to top
      for colIndex in range(colCount - 1, -1, -1):  # Iterate columns from right to 
        if rowIndex == rowCount-1 and colIndex == colCount-1:
          resultMatrix[rowIndex][colIndex] = 1
          continue #early return fot bottom right cell
          
        if obstacleGrid[rowIndex][colIndex] == 1:
          resultMatrix[rowIndex][colIndex] = 0
          continue #early return if there's an obstacle
        
        rightCellResult = 0
        if colIndex+1 < colCount: #not out of bounds
          rightCellResult = resultMatrix[rowIndex][colIndex+1]
        bottomCellResult = 0
        if rowIndex+1 < rowCount: #not out of bounds
          bottomCellResult = resultMatrix[rowIndex+1][colIndex]
        resultMatrix[rowIndex][colIndex] = rightCellResult + bottomCellResult
    return resultMatrix[0][0]