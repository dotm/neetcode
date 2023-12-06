/*
704. Binary Search
Easy
11.2K
227
Companies
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
 

Constraints:

1 <= nums.length <= 104
-104 < nums[i], target < 104
All the integers in nums are unique.
nums is sorted in ascending order.
*/
function search(nums: number[], target: number): number {
  if(nums.length === 0){
      return -1
  }

  let leftIndex = 0
  let rightIndex = nums.length-1
  let targetIndex = Math.floor((leftIndex+rightIndex)/2)

  while(leftIndex <= rightIndex){
      if(nums[targetIndex] > target){
          rightIndex = targetIndex - 1
          targetIndex = Math.floor((leftIndex+rightIndex)/2)
      }else if(nums[targetIndex] < target){
          leftIndex = targetIndex + 1
          targetIndex = Math.floor((leftIndex+rightIndex)/2)
      }else{
          //found match because nums[targetIndex] === target
          return targetIndex
      }
  }
  return -1
};