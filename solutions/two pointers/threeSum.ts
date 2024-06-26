/*
15. 3Sum
Medium

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 

Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/
function threeSum(nums: number[]): number[][] {
  const sortedNums = nums.sort((a,b)=>a-b)
  const result: number[][] = []
  for(let firstIndex=0; firstIndex<sortedNums.length; firstIndex++){
    let firstNum = sortedNums[firstIndex]
    if(firstIndex>0 && sortedNums[firstIndex]===sortedNums[firstIndex-1]){
      //skip if we have processed the same number as first index (to avoid duplicate triplets)
      continue
    }

    let secondIndex = firstIndex+1
    let thirdIndex = sortedNums.length-1
    while(secondIndex < thirdIndex){
      //basically the same algorithm as sorted two sum (except there's a firstNum)
      let secondNum = sortedNums[secondIndex]
      let thirdNum = sortedNums[thirdIndex]
      if(firstNum+secondNum+thirdNum < 0){
        secondIndex++
        continue
      }else if(firstNum+secondNum+thirdNum > 0){
        thirdIndex--
        continue
      }
      //else reached 0
      result.push([firstNum, secondNum, thirdNum])
      secondIndex++
      while(sortedNums[secondIndex]===sortedNums[secondIndex-1]){
        //skip if we have processed the same number as second index (to avoid duplicate triplets)
        secondIndex++
        continue
      }
    }
  }
  return result
};