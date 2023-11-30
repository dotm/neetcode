from typing import Optional

# Definition for singly-linked list.
class ListNode:
  def __init__(self, val=0, next=None):
    self.val = val
    self.next = next

class Solution:
  def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
    dummy = ListNode(-1, head) #using dummy node to pad start

    #using racing pointers
    leftPointer = dummy
    #init rightPointer
    rightPointer = head
    for i in range(n):
      if rightPointer == None:
        return None
      rightPointer = rightPointer.next

    #use rightPointer to move leftPointer to position
    while rightPointer != None:
      leftPointer = leftPointer.next
      rightPointer = rightPointer.next

    leftPointer.next = leftPointer.next.next

    return dummy.next