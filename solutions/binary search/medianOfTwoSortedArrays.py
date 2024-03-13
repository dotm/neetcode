"""
4. Median of Two Sorted Arrays
Solved
Hard
Topics
Companies
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-10^6 <= nums1[i], nums2[i] <= 10^6
"""

from typing import List

class Solution:
  def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
    smallerNums, largerNums = nums1, nums2
    total = len(nums1) + len(nums2)
    half = total // 2

    if len(largerNums) < len(smallerNums):
      #make smallerNums of smaller length than largerNums
      smallerNums, largerNums = largerNums, smallerNums

    leftPointer, rightPointer = 0, len(smallerNums) - 1
    while True:
      #binary search on the smaller nums
      indexForSmallerNums = (leftPointer + rightPointer) // 2
      #the larger nums index is added to reach the median
      indexForLargerNums = half - indexForSmallerNums - 2
      #both should add to half since we're searching for median

      #get the value on the left and right of the both nums partition
      smallerNumsLeftVal = smallerNums[indexForSmallerNums] if indexForSmallerNums >= 0 else float("-infinity")
      smallerNumsRightVal = smallerNums[indexForSmallerNums + 1] if (indexForSmallerNums + 1) < len(smallerNums) else float("infinity")
      largerNumsLeftVal = largerNums[indexForLargerNums] if indexForLargerNums >= 0 else float("-infinity")
      largerNumsRightVal = largerNums[indexForLargerNums + 1] if (indexForLargerNums + 1) < len(largerNums) else float("infinity")

      if smallerNumsLeftVal <= largerNumsRightVal and largerNumsLeftVal <= smallerNumsRightVal:
        #partition is correct (found the median)
        # because all the left values are less than right values
        # and because we're already taking half of total
        if total % 2:
          #if odd
          return min(smallerNumsRightVal, largerNumsRightVal)
        # even
        return (max(smallerNumsLeftVal, largerNumsLeftVal) + min(smallerNumsRightVal, largerNumsRightVal)) / 2
      elif smallerNumsLeftVal > largerNumsRightVal:
        #should take less of smallerNums because the vals are bigger
        rightPointer = indexForSmallerNums - 1
      else:
        #should take more of smallerNums because the vals are smaller
        leftPointer = indexForSmallerNums + 1
