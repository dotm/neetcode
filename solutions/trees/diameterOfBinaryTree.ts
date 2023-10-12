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

function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0

  function dfs(currentNode: TreeNode | null): number {
    if(currentNode === null){
      return 0
    }

    const leftDiameter = dfs(currentNode.left)
    const rightDiameter = dfs(currentNode.right)
    const diameterIfCurrentNodeIsRoot = leftDiameter+rightDiameter
    diameter = Math.max(diameter, diameterIfCurrentNodeIsRoot)

    return 1 + Math.max(leftDiameter, rightDiameter) //current node is NOT root
  }
  dfs(root)

  return diameter
};