/*
572. Subtree of Another Tree
Easy
7.9K
460
Companies
Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

 

Example 1:


Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true
Example 2:


Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false
 

Constraints:

The number of nodes in the root tree is in the range [1, 2000].
The number of nodes in the subRoot tree is in the range [1, 1000].
-104 <= root.val <= 104
-104 <= subRoot.val <= 104
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

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  if(subRoot === null){
    return true
  }else if(root === null){
    return false
  }

  return isSameTree(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
};

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