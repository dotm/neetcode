function uniquePaths(m: number, n: number): number {
  let row = Array(n).fill(1) //initialize bottom row
  for(
      let rowIndex=m-2; //-2 because bottom row has been initialized above and because length-1 is last element
      rowIndex>=0; //until it reaches the top (index 0)
      rowIndex--
  ){
      let newRowAbove: number[] = []
      //fill newRowAbove
      for(
          let colIndex=n-1; //start from the right (because finish is on the right)
          colIndex>=0; //until it reaches the left-most cell (index 0)
          colIndex--
      ){
          newRowAbove[colIndex] =
              (newRowAbove[colIndex+1] ?? 0) //value at the right cell
              + row[colIndex] //value at the bottom
      }
      //replace row with newRowAbove
      row = newRowAbove
  }
  return row[0]
};
