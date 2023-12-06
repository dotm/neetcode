"""
287. Find the Duplicate Number (Entry of Linked List Cycle)
Medium
21.9K
3.8K
Companies
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.

 

Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
 

Constraints:

1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.
 

Follow up:

How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?
"""
from typing import List

class Solution:
  def findDuplicate(self, nums: List[int]) -> int:
    #using fast and slow pointers (that points to the nums index)
    fast = 0
    slow = 0

    while True:
      #will never reached the end of linked list
      #based on the problem statement (there's always a cycle)

      #the next node (next index) is based on the value of the current index
      slow = nums[slow]
      fast = nums[nums[fast]]

      #fast and slow pointers meet at the intersect point      
      if fast == slow:
        break
    
    #using Floyd's algorithm to find the entry of the linked list cycle
    slow2 = 0
    while True:
      slow = nums[slow]
      slow2 = nums[slow2]
      #both pointers will meet at the entry of the linked list
      #because the distance from the intersection point to the entry
      #is always the same as the distance from the head to the entry
      if slow == slow2:
        return slow