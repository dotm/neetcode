function jump(nums: number[]): number {
  //using BFS
  let totalJump = 0
  let leftPointer = 0
  let rightPointer = 0
  while(rightPointer<nums.length-1){ //recheck
    let farthestJumpToIndex = leftPointer
    while(leftPointer<=rightPointer){
      const jumpDistance = leftPointer + nums[leftPointer]
      farthestJumpToIndex = Math.max(farthestJumpToIndex, jumpDistance)
      leftPointer++
    }
    leftPointer = rightPointer+1
    rightPointer = farthestJumpToIndex
    totalJump++
  }
  return totalJump
};