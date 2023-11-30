from typing import List

class Solution:
  def setZeroes(self, matrix: List[List[int]]) -> None:
    """
    Do not return anything, modify matrix in-place instead.
    """
    #mark a row or col should be zero by marking the first row and column entry as zero
    valueOfTopRowShouldBeZero = False
    rows = len(matrix)
    cols = len(matrix[0])
    for row in range(rows):
      for col in range(cols):
        if matrix[row][col] == 0:
          matrix[0][col] = 0
          if row == 0:
            valueOfTopRowShouldBeZero = True
          else:
            matrix[row][0] = 0
    
    #actually set the entry to be zero
    # except the first row and column because they are still used as marker
    for row in range(1, rows):
      for col in range(1, cols):
        if matrix[row][0] == 0 or matrix[0][col] == 0:
          matrix[row][col] = 0
    #set the first column to zero if needed
    if matrix[0][0] == 0:
      for row in range(rows):
        matrix[row][0] = 0
    #set the first row to zero if needed
    if valueOfTopRowShouldBeZero:
      for col in range(cols):
        matrix[0][col] = 0