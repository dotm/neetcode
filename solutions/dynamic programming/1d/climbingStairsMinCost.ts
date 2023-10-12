function minCostClimbingStairs(cost: number[]): number {
  let leftPointer = 0 //point to cost.length (to the right of last element)
  let rightPointer = 0 //point to cost.length+1
  let costFromIndexOne = Infinity
  for(let i=cost.length-1;i>=0;i--){
    let temp = cost[i] + Math.min(leftPointer, rightPointer)
    if(i===1){
      costFromIndexOne = temp
    }
    //shift
    rightPointer = leftPointer
    leftPointer = temp
  }
  return Math.min(leftPointer,costFromIndexOne)
};