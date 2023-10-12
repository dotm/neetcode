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
            break //
        }

        if(bottomRowIndex > topRowIndex){
            return false //element is below smallest value or above biggest value
        }
    }

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