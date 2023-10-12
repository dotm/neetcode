function longestConsecutive(nums: number[]): number {
  const numExistInArrSet = new Set<number>()
  for(let i=0;i<nums.length;i++){
      numExistInArrSet.add(nums[i])
  }
  let maxCount = 0
  for(let i=0;i<nums.length;i++){
      const startOfNewSequence = !numExistInArrSet.has(nums[i]-1)
      if(startOfNewSequence){
          let runningCount = 0
          while(true){
              if(numExistInArrSet.has(nums[i]+runningCount)){
                  runningCount += 1
                  maxCount = Math.max(maxCount, runningCount)
              }else{
                  break
              }
          }
      }
  }

  return maxCount
};