from typing import Optional

# Definition for a binary tree node.
class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right

class Solution:
  def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
    elementRank = 0 # 0 can be used because the result is 1-indexed
    stack = []
    currentNode = root
    while stack or currentNode: #while there are still nodes untraversed
      #do inorder traversal
      while currentNode:
        stack.append(currentNode)
        currentNode = currentNode.left
      #process the node
      currentNode = stack.pop()
      elementRank += 1
      if elementRank == k:
        return currentNode.val
      currentNode = currentNode.right
    #will always return because k <= n