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