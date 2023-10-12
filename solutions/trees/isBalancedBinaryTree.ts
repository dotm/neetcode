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

function isBalanced(root: TreeNode | null): boolean {
  function dfs(root: TreeNode | null): {balanced: boolean, height: number} {
    if(root === null){
      return {balanced: true, height: 0}
    }
    let leftSubtreeResult = dfs(root.left)
    let rightSubtreeResult = dfs(root.right)
    const balanced =
      leftSubtreeResult.balanced &&
      rightSubtreeResult.balanced &&
      Math.abs(leftSubtreeResult.height - rightSubtreeResult.height) <= 1
    const height = 1 + Math.max(leftSubtreeResult.height, rightSubtreeResult.height)
    return {balanced,height}
  }
  return dfs(root).balanced
};