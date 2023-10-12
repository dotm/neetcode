function canJump(nums: number[]): boolean {
  let targetIndex = nums.length-1 //the end
  for(let i=nums.length-2;i>=0;i--){
    if(i+nums[i] >= targetIndex){
      targetIndex=i //because reaching i means you can reach the end
    }
  }
  return targetIndex === 0
};