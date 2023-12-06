/*
200. Number of Islands
Medium
21.6K
470
Companies
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/
function numIslands(grid: string[][]): number {
  const visitedSet = new Set<string>()
  let numberOfIslands = 0
  for (let rowIndex=0;rowIndex<grid.length;rowIndex++){
    let row = grid[rowIndex]
    for(let colIndex=0;colIndex<row.length;colIndex++){
      let cell = row[colIndex]
      if(cell === "1" && !visitedSet.has(`${rowIndex},${colIndex}`)){
        numberOfIslands++

        //bfs
        const queue = [{
          rowIndex,
          colIndex,
          cell
        }]

        while (queue.length > 0){
          const curr = queue.shift()
          if(curr === undefined){
            break //same as the condition queue.length > 0 (here to appease TypeScript)
          }
          if(visitedSet.has(`${curr.rowIndex},${curr.colIndex}`)){
            continue
          }
          visitedSet.add(`${curr.rowIndex},${curr.colIndex}`)

          //visit down
          if(
            (curr.rowIndex+1) < grid.length
            && grid[curr.rowIndex+1][curr.colIndex] === "1"
            && !visitedSet.has(`${curr.rowIndex+1},${curr.colIndex}`)
          ){
            queue.push({
              rowIndex: curr.rowIndex+1,
              colIndex: curr.colIndex,
              cell: grid[curr.rowIndex+1][curr.colIndex],
            })
          }
          //visit up
          if(
            (curr.rowIndex-1) >= 0
            && grid[curr.rowIndex-1][curr.colIndex] === "1"
            && !visitedSet.has(`${curr.rowIndex-1},${curr.colIndex}`)
          ){
            queue.push({
              rowIndex: curr.rowIndex-1,
              colIndex: curr.colIndex,
              cell: grid[curr.rowIndex-1][curr.colIndex],
            })
          }
          //visit right
          if(
            (curr.colIndex+1) < grid[curr.rowIndex].length
            && grid[curr.rowIndex][curr.colIndex+1] === "1"
            && !visitedSet.has(`${curr.rowIndex},${curr.colIndex+1}`)
          ){
            queue.push({
              rowIndex: curr.rowIndex,
              colIndex: curr.colIndex+1,
              cell: grid[curr.rowIndex][curr.colIndex+1],
            })
          }
          //visit left
          if(
            (curr.colIndex-1) >= 0
            && grid[curr.rowIndex][curr.colIndex-1] === "1"
            && !visitedSet.has(`${curr.rowIndex},${curr.colIndex-1}`)
          ){
            queue.push({
              rowIndex: curr.rowIndex,
              colIndex: curr.colIndex-1,
              cell: grid[curr.rowIndex][curr.colIndex-1],
            })
          }
        }
      }
    }
  }
  return numberOfIslands
};