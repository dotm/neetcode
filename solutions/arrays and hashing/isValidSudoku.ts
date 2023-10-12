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