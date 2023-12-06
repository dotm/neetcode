/*
695. Max Area of Island
Medium
9.7K
198
Companies
You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

 

Example 1:


Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
Example 2:

Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] is either 0 or 1.
*/
function maxAreaOfIsland(grid: number[][]): number {
  const visitedSet = new Set<string>()
  let maxAreaOfIslands = 0
  for (let rowIndex=0;rowIndex<grid.length;rowIndex++){
    let row = grid[rowIndex]
    for(let colIndex=0;colIndex<row.length;colIndex++){
      let cell = row[colIndex]
      if(cell === 1 && !visitedSet.has(`${rowIndex},${colIndex}`)){
        //bfs
        const queue = [{
          rowIndex,
          colIndex,
          cell,
        }]

        let totalArea = 0
        while (queue.length > 0){
          const curr = queue.shift()
          if(curr === undefined){
            break //same as the condition queue.length > 0 (here to appease TypeScript)
          }
          if(visitedSet.has(`${curr.rowIndex},${curr.colIndex}`)){
            continue
          }
          visitedSet.add(`${curr.rowIndex},${curr.colIndex}`)
          totalArea++
          maxAreaOfIslands = Math.max(maxAreaOfIslands, totalArea)

          //visit down
          if(
            (curr.rowIndex+1) < grid.length
            && grid[curr.rowIndex+1][curr.colIndex] === 1
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
            && grid[curr.rowIndex-1][curr.colIndex] === 1
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
            && grid[curr.rowIndex][curr.colIndex+1] === 1
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
            && grid[curr.rowIndex][curr.colIndex-1] === 1
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
  return maxAreaOfIslands
};