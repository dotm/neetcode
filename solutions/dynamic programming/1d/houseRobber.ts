function rob(nums: number[]): number {
  let leftPointer = 0
  let rightPointer = 0
  for(let i=0;i<nums.length;i++){
    let temp = Math.max(nums[i] + leftPointer, rightPointer)
    leftPointer = rightPointer
    rightPointer = temp
  }
  return rightPointer
};