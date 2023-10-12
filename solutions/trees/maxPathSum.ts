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