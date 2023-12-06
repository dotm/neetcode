/*
48. Rotate Image
Medium
16.6K
735
Companies
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

 

Example 1:


Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
Example 2:


Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 

Constraints:

n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000
*/
/**
    Do not return anything, modify matrix in-place instead.
*/
function rotate(matrix: number[][]): void {
    let ringLength = matrix.length //start from outermost ring
    let ringProcessed = 0

    //process rings
    while (ringLength > 1){

        //process one ring
        let rotationDone = 0
        while(rotationDone < ringLength-1){
            let tmpForTopLeftVal =
                matrix[ringProcessed][ringProcessed+rotationDone]
            //fill top left (static top row) with bottom left (static left col)
            matrix[ringProcessed][ringProcessed+rotationDone] =
                matrix[ringProcessed+ringLength-1-rotationDone][ringProcessed]
            //fill bottom left (static left col) with bottom right (static bottom row)
            matrix[ringProcessed+ringLength-1-rotationDone][ringProcessed] =
                matrix[ringProcessed+ringLength-1][ringProcessed+ringLength-1-rotationDone]
            //fill bottom right (static bottom row) with top right (static right col)
            matrix[ringProcessed+ringLength-1][ringProcessed+ringLength-1-rotationDone] =
                matrix[ringProcessed+rotationDone][ringProcessed+ringLength-1]
            //fill top right (static right col) with top left (from temporary value)
            matrix[ringProcessed+rotationDone][ringProcessed+ringLength-1] =
                tmpForTopLeftVal
            
            rotationDone++
        }

        //go to inner ring
        ringLength -= 2
        ringProcessed++
    }
};