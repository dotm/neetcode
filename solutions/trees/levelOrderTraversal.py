from typing import List
from typing import Optional

# Definition for a binary tree node.
class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right

class Solution:
  def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
    queue = [root]
    result = []
    while queue:
      nextLevelQueue = []
      currentLevelResult = []
      for node in queue:
        if not node:
          continue
        nextLevelQueue.append(node.left)
        nextLevelQueue.append(node.right)
        currentLevelResult.append(node.val)
      if currentLevelResult:
        result.append(currentLevelResult)
      queue = nextLevelQueue
    return result