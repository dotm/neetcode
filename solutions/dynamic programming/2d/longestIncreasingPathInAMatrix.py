"""
329. Longest Increasing Path in a Matrix
Solved
Hard
Topics
Companies
Given an m x n integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

 

Example 1:


Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
Example 2:


Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
Example 3:

Input: matrix = [[1]]
Output: 1
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 200
0 <= matrix[i][j] <= 2^31 - 1
"""
from typing import List

class Solution:
  def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
    totalRows = len(matrix)
    totalCols = len(matrix[0])
    cache = {} #{(row, col): longestIncreasingPath}

    def dfs(row, col, prevValue):
      if (
        #row or col out of bounds
        row < 0 or
        col < 0 or
        row == totalRows or
        col == totalCols or
        #or can't move to this cell
        matrix[row][col] <= prevValue
      ):
        return 0 #skip
      if (row, col) in cache:
        return cache[(row, col)] #return cached value
      
      res = 1 #just to setup, will be overrided below
      res = max(res, 1 + dfs(row+1,col,matrix[row][col]))
      res = max(res, 1 + dfs(row-1,col,matrix[row][col]))
      res = max(res, 1 + dfs(row,col+1,matrix[row][col]))
      res = max(res, 1 + dfs(row,col-1,matrix[row][col]))
      cache[(row, col)] = res
      return res
    
    maxLongestIncreasingPath = 0 #just to setup, will be overrided below
    for row in range(totalRows):
      for col in range(totalCols):
        maxLongestIncreasingPath = max(maxLongestIncreasingPath, dfs(row, col, -1))
        #-1 because we need a value that is smaller than our cells' value (0)
    return maxLongestIncreasingPath
