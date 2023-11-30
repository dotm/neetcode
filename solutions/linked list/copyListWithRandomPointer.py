from typing import Optional

"""
# Definition for a Node.
"""
class Node:
  def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
    self.val = int(x)
    self.next = next
    self.random = random

class Solution:
  def copyRandomList(self, head: Optional[Node]) -> Optional[Node]:
    originalToCopyMap = {None: None} #avoid KeyError when pointer.random is None

    #first pass to instantiate all nodes
    pointer = head
    while pointer != None:
      originalToCopyMap[pointer] = Node(pointer.val)
      pointer = pointer.next
    
    #second pass to instantiate put the correct pointers
    pointer = head
    while pointer != None:
      originalToCopyMap[pointer].next = originalToCopyMap[pointer.next]
      originalToCopyMap[pointer].random = originalToCopyMap[pointer.random]
      pointer = pointer.next

    return originalToCopyMap[head]