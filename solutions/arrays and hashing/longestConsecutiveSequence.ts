/*
128. Longest Consecutive Sequence
Medium
18.8K
877
Companies
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

 

Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
 

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
*/
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