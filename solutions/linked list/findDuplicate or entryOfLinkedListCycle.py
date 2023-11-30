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