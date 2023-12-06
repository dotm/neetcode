/*
417. Pacific Atlantic Water Flow
Medium
7K
1.4K
Companies
There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

 

Example 1:


Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
Example 2:

Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
 

Constraints:

m == heights.length
n == heights[r].length
1 <= m, n <= 200
0 <= heights[r][c] <= 105
*/
function pacificAtlantic(heights: number[][]): number[][] {
  let canReachPacificSet = new Set<string>()
  let canReachAtlanticSet = new Set<string>()
  const lastRow = heights.length-1
  const lastCol = heights[0].length-1

  function dfs(row: number, col: number, previousValue: number, oceanSet: Set<string>){
    if(row < 0 || col < 0 || row > lastRow || col > lastCol){
      //out of bounds
      return
    }
    if(oceanSet.has(`${row},${col}`)){
      //already traversed
      return
    }
    let valueOfCurrentCell=heights[row][col]
    if(valueOfCurrentCell >= previousValue){
      oceanSet.add(`${row},${col}`)
      dfs(row-1, col, valueOfCurrentCell, oceanSet) //up
      dfs(row, col-1, valueOfCurrentCell, oceanSet) //left
      dfs(row+1, col, valueOfCurrentCell, oceanSet) //down
      dfs(row, col+1, valueOfCurrentCell, oceanSet) //right
    }
  }
  
  for(let col=0; col<heights[0].length; col++){
    dfs(0,col,-Infinity,canReachPacificSet)
    dfs(lastRow,col,-Infinity,canReachAtlanticSet)
  }
  for(let row=0; row<heights.length; row++){
    dfs(row,0,-Infinity,canReachPacificSet)
    dfs(row,lastCol,-Infinity,canReachAtlanticSet)
  }

  //intersect set and return
  const canReachBothOceans: number[][] = []
  for(const cell of canReachPacificSet){
    if(canReachAtlanticSet.has(cell)){
      let [a,b]=cell.split(",")
      canReachBothOceans.push([parseInt(a),parseInt(b)])
    }
  }
  return canReachBothOceans
};

console.log(pacificAtlantic([
  [1,2,3],
  [8,9,4],
  [7,6,5]
]))