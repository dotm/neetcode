/*
46. Permutations
Medium
18.3K
295
Companies
Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
 

Constraints:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.
*/
function permute(nums: number[]): number[][] {
  const permutationList: number[][] = []
  
  function dfsRecurse(currentNums: number[], selectedNums: number[]){
    if(selectedNums.length >= nums.length){
      permutationList.push(selectedNums)
      return
    }
    for(let i=0;i<currentNums.length;i++){
      const clonedNums = [...currentNums]
      const [selectedNum] = clonedNums.splice(i,1)
      dfsRecurse(clonedNums, [...selectedNums, selectedNum])
    }
  }
  dfsRecurse(nums,[])
  return permutationList
};