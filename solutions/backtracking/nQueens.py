"""
51. N-Queens
Solved
Hard
Topics
Companies
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

 

Example 1:


Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
Example 2:

Input: n = 1
Output: [["Q"]]
 

Constraints:

1 <= n <= 9
"""
from typing import List

class Solution:
  def solveNQueens(self, n: int) -> List[List[str]]:
    occupiedColumns = set()
    occupiedUpwardDiagonals = set() # for all square in a / the result of row + col stays constant
    occupiedDownwardDiagonals = set() # for all square in a \ the result of row - col stays constant

    result = []
    board = [["."] * n for i in range(n)]
    def backtrack(row):
      if row == n: #if we successfully get past the last row
        boardCopy = ["".join(row) for row in board] #copy because we'll use board for next iteration
        result.append(boardCopy) #add copy to result
        return
      for col in range(n):
        if (
          col in occupiedColumns #there's already another queen at this column
          or (row+col) in occupiedUpwardDiagonals #there's already another queen is the same upward diagonal
          or (row-col) in occupiedDownwardDiagonals #there's already another queen is the same downward diagonal
        ):
          continue #can't use this column
        #else we can use this column
        occupiedColumns.add(col)
        occupiedUpwardDiagonals.add(row+col)
        occupiedDownwardDiagonals.add(row-col)
        board[row][col] = "Q"
        
        backtrack(row+1) #can continue to the next row

        #reset and check if we can use the next columns too
        occupiedColumns.remove(col)
        occupiedUpwardDiagonals.remove(row+col)
        occupiedDownwardDiagonals.remove(row-col)
        board[row][col] = "."
    
    backtrack(0)
    #start iterating from 0.
    #if at any row we can't use all the columns,
    #  we won't get past the last row (and no solution will be added)
    return result