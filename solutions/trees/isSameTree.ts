/*
100. Same Tree
Easy
10.7K
214
Companies
Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

 

Example 1:


Input: p = [1,2,3], q = [1,2,3]
Output: true
Example 2:


Input: p = [1,2], q = [1,null,2]
Output: false
Example 3:


Input: p = [1,2,1], q = [1,1,2]
Output: false
 

Constraints:

The number of nodes in both trees is in the range [0, 100].
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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if(p === null && q === null){
    return true
  }
  let queueForP: Array<TreeNode|null> = [p]
  let queueForQ: Array<TreeNode|null> = [q]
  while(queueForP.length > 0 && queueForQ.length > 0){
    if(queueForP.length !== queueForQ.length){
      return false
    }
    for(let i=0;i<queueForP.length;i++){
      const nodeP = queueForP.shift()
      const nodeQ = queueForQ.shift()
      if(nodeP?.val !== nodeQ?.val){
        return false
      }
      if(nodeP !== undefined && nodeP !== null){
        queueForP.push(nodeP.left)
        queueForP.push(nodeP.right)
      }
      if(nodeQ !== undefined && nodeQ !== null){
        queueForQ.push(nodeQ.left)
        queueForQ.push(nodeQ.right)
      }
    }
  }
  return true
};