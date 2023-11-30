from typing import List
from typing import Optional

# Definition for a binary tree node.
class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right

class Solution:
  def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
    queue = [root]
    result = []

    while queue:
      nextLevelQueue = []
      alreadyAddRightMostElement = False
      for node in queue:
        if not node:
          continue
        #sort the queue from right to left
        nextLevelQueue.append(node.right)
        nextLevelQueue.append(node.left)
        if not alreadyAddRightMostElement and node != None:
          result.append(node.val)
          alreadyAddRightMostElement = True
      queue = nextLevelQueue

    return result