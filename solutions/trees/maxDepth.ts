/*
104. Maximum Depth of Binary Tree
Easy
12.2K
203
Companies
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 3
Example 2:

Input: root = [1,null,2]
Output: 2
 

Constraints:

The number of nodes in the tree is in the range [0, 104].
-100 <= Node.val <= 100
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

function maxDepth(root: TreeNode | null): number {
  return dfsRecursive_maxDepth(root)
}

function dfsRecursive_maxDepth(root: TreeNode | null): number {
  if(root === null){
    return 0
  }

  return 1 + Math.max(dfsRecursive_maxDepth(root.left), dfsRecursive_maxDepth(root.right))
};

function dfsIterative_maxDepth(root: TreeNode | null): number {
  if(root === null){
    return 0
  }

  let maxDepth = 1
  let stack: {node: TreeNode, depth: number}[] = [{node: root, depth: 1}]
  while (stack.length > 0){
    //get from stack
    const element = stack.pop()
    //process data
    if(element === undefined){continue} //pacify typescript
    maxDepth = Math.max(maxDepth, element.depth)
    //add to stack
    if(element.node.left !== null){
      stack.push({node: element.node.left, depth: element.depth + 1})
    }
    if(element.node.right !== null){
      stack.push({node: element.node.right, depth: element.depth + 1})
    }
  }

  return maxDepth
};

function bfs_maxDepth(root: TreeNode | null): number {
  if(root === null){
    return 0
  }

  let maxDepth = 0
  let queue: TreeNode[] = [root]
  while (queue.length > 0){
    maxDepth++
    let nodeAtCurrentDepth = queue.length
    for(let i=0; i<nodeAtCurrentDepth; i++){
      //get from queue
      const node = queue.shift() //dequeue
      
      //process data
      if(node === undefined){continue} //pacify typescript

      //add to queue
      if(node.left !== null){
        queue.push(node.left)
      }
      if(node.right !== null){
        queue.push(node.right)
      }
    }
  }

  return maxDepth
};