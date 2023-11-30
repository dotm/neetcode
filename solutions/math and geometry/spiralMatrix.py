from typing import List

class Solution:
  def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
    top = 0
    bottom = len(matrix) - 1
    left = 0
    right = len(matrix[0]) - 1

    output = []
    while top <= bottom and left <= right:
      #circle the matrix and push into output
      currentRow = top
      currentCol = left
      output.append(matrix[currentRow][currentCol])
      #go right from top left
      while currentCol + 1 <= right:
        currentCol += 1
        output.append(matrix[currentRow][currentCol])
      #go down from top right
      while currentRow + 1 <= bottom:
        currentRow += 1
        output.append(matrix[currentRow][currentCol])
      #go left from bottom right
      while currentCol - 1 >= left and top != bottom: #and exclude 1 line row case
        currentCol -= 1
        output.append(matrix[currentRow][currentCol])
      #go up from bottom left
      while currentRow - 1 >= top and left != right: #and exclude 1 line column case
        currentRow -= 1
        if currentRow != top: #condition to exclude top left
          output.append(matrix[currentRow][currentCol])
      #go to deeper layer
      top += 1
      bottom -= 1
      left += 1
      right -= 1
    return output
