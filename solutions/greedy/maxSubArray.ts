function maxSubArray(nums: number[]): number {
  let maxValue = nums[0]
  let index = 0
  let sumValueUpToIndex = 0
  while(index<nums.length){
    sumValueUpToIndex += nums[index]
    maxValue = Math.max(maxValue, sumValueUpToIndex)
    sumValueUpToIndex = Math.max(sumValueUpToIndex, 0)
    index++
  }
  return maxValue
};