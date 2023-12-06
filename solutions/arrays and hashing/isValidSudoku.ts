/*
36. Valid Sudoku
Medium
10K
1K
Companies
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 

Example 1:


Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.
*/
function isValidSudoku(board: string[][]): boolean {
  const rowsMap = new Map<number,Set<string>>()
  const colsMap = new Map<number,Set<string>>()
  const squaresMap = new Map<string,Set<string>>()

  for(let rowIndex=0;rowIndex<board.length;rowIndex++){
      const colsArr = board[rowIndex]
      for(let colIndex=0;colIndex<colsArr.length;colIndex++){
          const digit = board[rowIndex][colIndex]

          let rowSet = rowsMap.get(rowIndex) ?? new Set<string>()
          if(rowSet.has(digit) && digit !== "."){
              return false
          }
          rowSet.add(digit)
          rowsMap.set(rowIndex, rowSet)

          let colSet = colsMap.get(colIndex) ?? new Set<string>()
          if(colSet.has(digit) && digit !== "."){
              return false
          }
          colSet.add(digit)
          colsMap.set(colIndex, colSet)

          const squareIndex = `${Math.floor(rowIndex/3)},${Math.floor(colIndex/3)}`
          let squareSet = squaresMap.get(squareIndex) ?? new Set<string>()
          if(squareSet.has(digit) && digit !== "."){
              return false
          }
          squareSet.add(digit)
          squaresMap.set(squareIndex, squareSet)
      }
  }
  return true
};

let board =
[[".",".",".",".","5",".",".","1","."],[".","4",".","3",".",".",".",".","."],[".",".",".",".",".","3",".",".","1"],["8",".",".",".",".",".",".","2","."],[".",".","2",".","7",".",".",".","."],[".","1","5",".",".",".",".",".","."],[".",".",".",".",".","2",".",".","."],[".","2",".","9",".",".",".",".","."],[".",".","4",".",".",".",".",".","."]]
console.log(isValidSudoku(board))