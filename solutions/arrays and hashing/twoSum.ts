function twoSum(nums: number[], target: number): number[] {
  const numMap = new Map<number,number>()
  for(let i=0; i<nums.length; i++){
      const val = numMap.get(target-nums[i])
      if(val !== undefined){
          return [val, i]
      }
      numMap.set(nums[i], i)
  }
  return []
};