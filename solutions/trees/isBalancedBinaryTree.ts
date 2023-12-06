/*
110. Balanced Binary Tree
Easy
10.1K
601
Companies
Given a binary tree, determine if it is 
height-balanced
.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: true
Example 2:


Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
Example 3:

Input: root = []
Output: true
 

Constraints:

The number of nodes in the tree is in the range [0, 5000].
-104 <= Node.val <= 104
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