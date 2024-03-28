"""
25. Reverse Nodes in k-Group

Hard

Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
Example 2:


Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
 

Constraints:

The number of nodes in the list is n.
1 <= k <= n <= 5000
0 <= Node.val <= 1000
 

Follow-up: Can you solve the problem in O(1) extra memory space?
"""
from typing import Optional

# Definition for singly-linked list.
class ListNode:
  def __init__(self, val=0, next=None):
    self.val = val
    self.next = next

class Solution:
  def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
    dummy = ListNode(0, head)
    nodeBeforeTheGroup = dummy

    while True:
      nodeAtEndOfGroup = self.getKth(nodeBeforeTheGroup, k)
      if not nodeAtEndOfGroup:
        break #stop reverse if can't create another k-length group
      nodeAfterTheGroup = nodeAtEndOfGroup.next #the node after the k-group

      #reverse group
      previousNode = nodeAtEndOfGroup.next #the node after the k-group because if we set this to None the group will be disconnected
      currentNode = nodeBeforeTheGroup.next
      while currentNode != nodeAfterTheGroup: #while still in the group
        tmp = currentNode.next
        currentNode.next = previousNode
        previousNode = currentNode
        currentNode = tmp
      
      
      tmp = nodeBeforeTheGroup.next
      #prepare to update the nodeBeforeTheGroup for the next iteration.
      #nodeBeforeTheGroup.next points to the first node in our group before the group is reversed;
      #now that node is the last node in our group because the group is reversed.
       
      nodeBeforeTheGroup.next = nodeAtEndOfGroup #move k-th from the last node in our group to the first node in the group
      
      nodeBeforeTheGroup = tmp #update the nodeBeforeTheGroup for the next iteration
    return dummy.next

  #will return the end node of a k-group because we're using dummy node before the head
  def getKth(self, currentNode, k):
    while currentNode and k > 0:
      currentNode = currentNode.next
      k -= 1
    return currentNode