/*
62. Unique Paths
Medium
15.9K
420
Companies
There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 109.

 

Example 1:


Input: m = 3, n = 7
Output: 28
Example 2:

Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
 

Constraints:

1 <= m, n <= 100
*/
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
