/*
238. Product of Array Except Self
Medium
20.7K
1.2K
Companies
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

 

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
 

Constraints:

2 <= nums.length <= 105
-30 <= nums[i] <= 30
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 

Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)
 */
function productExceptSelf(nums: number[]): number[] {
  let leftArr: number[] = []
  let rightArr: number[] = []
  for(let i=nums.length-1;i>=0;i--){
    if(i===nums.length-1){
      rightArr[i]=1
      continue
    }
    rightArr[i] = rightArr[i+1] * nums[i+1]
  }
  for(let i=0;i<nums.length;i++){
      if(i===0){
          leftArr[i]=1
          continue
      }
      leftArr[i] = leftArr[i-1] * nums[i-1]
    }
  
    let out: number[] = []
    for(let i=0;i<nums.length;i++){
      out[i] = leftArr[i] * rightArr[i]
    }
    return out
};


console.log(productExceptSelf([1,2,3,4]))