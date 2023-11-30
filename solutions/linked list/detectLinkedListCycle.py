from typing import Optional

# Definition for singly-linked list.
class ListNode:
  def __init__(self, val=0, next=None):
    self.val = val
    self.next = next

class Solution:
  def hasCycle(self, head: Optional[ListNode]) -> bool:
    #using fast and slow pointers
    fast = head
    slow = head

    while True:
      #if reached the end of linked list, then no cycle exists
      if fast == None or slow == None:
        return False

      slow = slow.next
      fast = fast.next
      fast = fast.next if fast else None
      
      #if fast and slow pointers meet, then a cycle exists
      if fast == slow and fast != None:
        return True