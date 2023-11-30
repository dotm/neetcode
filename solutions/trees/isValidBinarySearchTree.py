from typing import Optional

# Definition for a binary tree node.
class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right

class Solution:
  def isValidBST(self, root: Optional[TreeNode]) -> bool:
    def dfs(node: Optional[TreeNode], lowerBoundary: int, upperBoundary: int) -> bool:
      if not node:
        return True
      if node.val <= lowerBoundary or node.val >= upperBoundary:
        return False
      
      return dfs(node.left, lowerBoundary, node.val) and dfs(node.right, node.val, upperBoundary)
    
    return dfs(root, float("-inf"), float("inf"))