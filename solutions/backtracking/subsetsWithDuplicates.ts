/*
90. Subsets II
Medium

Given an integer array nums that may contain duplicates, return all possible 
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
*/

function subsetsWithDup(nums: number[]): number[][] {
  let result: number[][] = []
  nums.sort() //to make it easier to skip duplicates

  function backtrack(i: number, subset: number[]){
    if(i === nums.length){
      //reached the end of the decision tree
      result.push([...subset]) //copy the subset to pass by value
      return
    }

    //backtrack all subsets that includes nums[i]
    subset.push(nums[i])
    backtrack(i+1, subset)
    //backtrack all subsets that don't include nums[i]
    subset.pop()
    while (i+1 < nums.length && nums[i] === nums[i+1]){
      //there's still next index and element at next index is the same as this index
      //(skip all nums[i])
      i+=1
    }
    backtrack(i+1, subset)
  }

  backtrack(0, [])
  return result
};