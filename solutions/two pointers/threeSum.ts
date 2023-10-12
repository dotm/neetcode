function threeSum(nums: number[]): number[][] {
  const sortedNums = nums.sort((a,b)=>a-b)
  const result: number[][] = []
  for(let firstIndex=0; firstIndex<sortedNums.length; firstIndex++){
    let firstNum = sortedNums[firstIndex]
    if(firstIndex>0 && sortedNums[firstIndex]===sortedNums[firstIndex-1]){
      continue
    }

    let secondIndex = firstIndex+1
    let thirdIndex = sortedNums.length-1
    while(secondIndex < thirdIndex){
      let secondNum = sortedNums[secondIndex]
      let thirdNum = sortedNums[thirdIndex]
      if(firstNum+secondNum+thirdNum < 0){
        secondIndex++
        continue
      }else if(firstNum+secondNum+thirdNum > 0){
        thirdIndex--
        continue
      }
      //else reached 0
      result.push([firstNum, secondNum, thirdNum])
      secondIndex++
      while(sortedNums[secondIndex]===sortedNums[secondIndex-1]){
        secondIndex++
        continue
      }
    }
  }
  return result
};