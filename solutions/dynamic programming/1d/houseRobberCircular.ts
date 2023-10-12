function rob(nums: number[]): number {
  if(nums.length === 1){
    return nums[0]
  }
  let clonedNumsLeft = [...nums]
  clonedNumsLeft.shift()
  let clonedNumsRight = [...nums]
  clonedNumsRight.pop()

  return Math.max(helper(clonedNumsLeft),helper(clonedNumsRight))
};

//this helper is the same as the rob function in houseRobber.ts
function helper(nums: number[]): number {
  let leftPointer = 0
  let rightPointer = 0
  for(let i=0;i<nums.length;i++){
    let temp = Math.max(nums[i] + leftPointer, rightPointer)
    leftPointer = rightPointer
    rightPointer = temp
  }
  return rightPointer
};