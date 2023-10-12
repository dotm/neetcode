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