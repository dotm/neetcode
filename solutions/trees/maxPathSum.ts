/*
124. Binary Tree Maximum Path Sum
Hard
15.9K
692
Companies
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.

 

Example 1:


Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
Example 2:


Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
 

Constraints:

The number of nodes in the tree is in the range [1, 3 * 104].
-1000 <= Node.val <= 1000
*/
/**
 * Definition for a binary tree node.
*/
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}

function maxPathSum(root: TreeNode | null): number {
  let maxPathSum = -Infinity

  function dfs(root: TreeNode | null): number {
      if(root === null){
          return 0
      }

      //Math.max for cases when children's sum is negative
      const leftSum = Math.max(0, dfs(root.left))
      const rightSum = Math.max(0, dfs(root.right))
      const sumIfNodeIsRoot = root.val + leftSum + rightSum
      maxPathSum = Math.max(maxPathSum, sumIfNodeIsRoot)

      const sumIfNodeIsNotRoot = Math.max(leftSum + root.val, rightSum + root.val)
      return sumIfNodeIsNotRoot //negative value here is handled in Math.max above
  }
  dfs(root)

  return maxPathSum
};