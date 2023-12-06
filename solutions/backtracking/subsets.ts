/*
78. Subsets
Medium
16.2K
243
Companies
Given an integer array nums of unique elements, return all possible 
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.
*/
function subsets(nums: number[]): number[][] {
    let subsets: number[][] = []
    for(let i=0;i<nums.length;i++){
        let nextSubsets: number[][] = []
        if(subsets.length === 0){
            subsets = [[], [nums[i]]]
            continue
        }
        for(let j=0;j<subsets.length;j++){
            //add nums[i]
            if(subsets[j].length === 0){
                nextSubsets.push([nums[i]])
            }else{
                nextSubsets.push([...subsets[j], nums[i]])
            }

            //don't add nums[i]
            nextSubsets.push(subsets[j])
        }
        subsets = nextSubsets
    }
    return subsets
};