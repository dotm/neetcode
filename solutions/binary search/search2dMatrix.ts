/*
74. Search a 2D Matrix
Medium

You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

Example 1:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104
*/
function searchMatrix(matrix: number[][], target: number): boolean {
  let topRowIndex = matrix.length-1
  let bottomRowIndex = 0

  let currentRowIndex = Math.floor((topRowIndex + bottomRowIndex) / 2)
  let currentRow = matrix[currentRowIndex]
  while (true){
    currentRowIndex = Math.floor((topRowIndex + bottomRowIndex) / 2)
    currentRow = matrix[currentRowIndex]
    if(currentRow[currentRow.length-1] < target){
      bottomRowIndex = currentRowIndex + 1
    }else if(currentRow[0] > target){
      topRowIndex = currentRowIndex - 1
    }else{
      break //continue searching in this row
    }

    if(bottomRowIndex > topRowIndex){
      return false //element is below smallest value or above biggest value
    }
  }

  //normal binary search
  let topColumnIndex = currentRow.length-1
  let bottomColumnIndex = 0
  while(true){
    let currentColumnIndex = Math.floor((topColumnIndex + bottomColumnIndex) / 2)
    if(currentRow[currentColumnIndex] < target){
      bottomColumnIndex = currentColumnIndex + 1
    }else if(currentRow[currentColumnIndex] > target){
      topColumnIndex = currentColumnIndex - 1
    }else{
      return true
    }

    if(bottomColumnIndex > topColumnIndex){
      return false //element not found
    }
  }
};

console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3))