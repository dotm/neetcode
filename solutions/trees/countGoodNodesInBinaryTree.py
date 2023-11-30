# Definition for a binary tree node.
class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right

class Solution:
  def goodNodes(self, root: TreeNode) -> int:
    def dfs(node: TreeNode, maxValueInPath: int) -> int:
      if node == None:
        return 0
      
      maxValueInPath = max(maxValueInPath, node.val)
      count = 0
      if node.val >= maxValueInPath:
        count += 1
      return count + dfs(node.left, maxValueInPath) + dfs(node.right, maxValueInPath)

    return dfs(root, float('-inf'))