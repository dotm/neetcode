/*
33. Search in Rotated Sorted Array
Medium
24.9K
1.5K
Companies
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1
 

Constraints:

1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-10^4 <= target <= 10^4
*/

function search(nums: number[], target: number): number {
  let leftPointer: number = 0;
  let rightPointer: number = nums.length - 1;

  while (leftPointer <= rightPointer) {
    const midPointer: number = Math.floor((leftPointer + rightPointer) / 2);
    const midValue: number = nums[midPointer];

    if (midValue === target) {
      return midPointer;
    }

    const listNotRotated: boolean = nums[leftPointer] < nums[rightPointer];

    if (listNotRotated) {
      // do usual binary search
      if (midValue < target) {
        leftPointer = midPointer + 1;
      } else if (midValue > target) {
        rightPointer = midPointer - 1;
      }
      // midValue === target already handled above
    } else { // list is rotated
      const midIsPartOfBiggerValues: boolean = midValue >= nums[leftPointer];
      const midIsPartOfSmallerValues: boolean = !midIsPartOfBiggerValues;

      if (midValue < target) {
        if (midIsPartOfBiggerValues) { // [4,5,6,7,8,1,2] mid:7 target:8
          leftPointer = midPointer + 1;
        } else {
          if (nums[leftPointer] <= target) { // [6,0,1,2,3,4,5] mid:2 target:6
            rightPointer = midPointer - 1;
          } else if (nums[rightPointer] >= target) { // [6,0,1,2,3,4,5] mid:2 target:4
            leftPointer = midPointer + 1;
          } else {
            return -1;
          }
        }
      } else if (midValue > target) { // [6,0,1,2,3,4,5] mid:2 target:3
        if (midIsPartOfSmallerValues) {
          rightPointer = midPointer - 1;
        } else {
          if (nums[leftPointer] <= target) { // [4,5,6,7,8,1,2] mid:7 target:5
            rightPointer = midPointer - 1;
          } else if (nums[rightPointer] >= target) { // [4,5,6,7,8,1,2] mid:7 target:2
            leftPointer = midPointer + 1;
          } else {
            return -1;
          }
        }
      }
      // midValue === target already handled above
    }
  }

  return -1;
}


// class Solution:
//   def search(self, nums: List[int], target: int) -> int:
//     leftPointer = 0
//     rightPointer = len(nums)-1

//     while leftPointer <= rightPointer:
//       midPointer = (leftPointer + rightPointer) // 2
//       midValue = nums[midPointer]
//       if midValue == target:
//         return midPointer
      
//       listNotRotated = nums[leftPointer] < nums[rightPointer]
//       if listNotRotated:
//         #do usual binary search
//         if midValue < target:
//           leftPointer = midPointer + 1
//         elif midValue > target:
//           rightPointer = midPointer - 1
//         # midValue == target already handled above
//       else: #list is rotated
//         midIsPartOfBiggerValues = nums[midPointer] >= nums[leftPointer]
//         midIsPartOfSmallerValues = not midIsPartOfBiggerValues
        
//         if midValue < target:
//           if midIsPartOfBiggerValues: # [4,5,6,7,8,1,2] mid:7 target:8
//             leftPointer = midPointer + 1
//           else:
//             if nums[leftPointer] <= target: # [6,0,1,2,3,4,5] mid:2 target:6
//               rightPointer = midPointer - 1
//             elif nums[rightPointer] >= midValue: # [6,0,1,2,3,4,5] mid:2 target:4
//               leftPointer = midPointer + 1
//             else:
//               return -1
//         elif midValue > target: # [6,0,1,2,3,4,5] mid:2 target:3
//           if midIsPartOfSmallerValues:
//             rightPointer = midPointer - 1
//           else:
//             if nums[leftPointer] <= midValue: # [4,5,6,7,8,1,2] mid:7 target:5
//               rightPointer = midPointer - 1
//             elif nums[rightPointer] >= midValue: # [4,5,6,7,8,1,2] mid:7 target:2
//               leftPointer = midPointer + 1
//             else:
//               return -1
//         # midValue == target already handled above
    
//     return -1
