/*
45. Jump Game II
Medium
13.8K
496
Companies
You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [2,3,0,1,4]
Output: 2
 

Constraints:

1 <= nums.length <= 104
0 <= nums[i] <= 1000
It's guaranteed that you can reach nums[n - 1].
*/
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