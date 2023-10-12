function twoSum(numbers: number[], target: number): number[] {
  let leftPointer = 0
  let rightPointer = numbers.length-1
  while(leftPointer < rightPointer){
    if(numbers[leftPointer]+numbers[rightPointer] > target){
      rightPointer--
    }else if(numbers[leftPointer]+numbers[rightPointer] < target){
      leftPointer++
    }else{
      break //solution found
    }
  }
  return [leftPointer + 1, rightPointer +1] //answer is one-indexed
};