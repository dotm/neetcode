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