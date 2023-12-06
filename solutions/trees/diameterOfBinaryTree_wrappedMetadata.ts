/*
543. Diameter of Binary Tree
Easy
12.8K
830
Companies
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

 

Example 1:


Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
Example 2:

Input: root = [1,2]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
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

interface WrappedTreeNodeMetadata {
  diameterIfIsRootOfDiameter: number | undefined,
  diameterIfIsNotRootOfDiameter: number | undefined,
}
interface WrappedTreeNodeParams {
  nodeIndex: number,
  #parentIndex: number | null,
  leftIndex: number | null,
  rightIndex: number | null,
  node: TreeNode,
  metadata: WrappedTreeNodeMetadata | undefined,
}
class WrappedTreeNode {
  nodeIndex: number
  #parentIndex: number | null
  leftIndex: number | null
  rightIndex: number | null
  node: TreeNode
  val: number
  metadata: WrappedTreeNodeMetadata
  constructor(obj: WrappedTreeNodeParams) {
    this.nodeIndex = obj.nodeIndex
    this.#parentIndex = obj.#parentIndex
    this.leftIndex = obj.leftIndex
    this.rightIndex = obj.rightIndex
    this.node = obj.node
    this.val = obj.node.val
    this.metadata = obj.metadata ?? {
      diameterIfIsRootOfDiameter: undefined,
      diameterIfIsNotRootOfDiameter: undefined,
    }
  }
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  if(root === null){
    return -1
  }

  let diameter = 0
  let queue: {node: TreeNode, #parentIndex: number | null, position: "left" | "right" | "root"}[] =
    [{node: root, #parentIndex: null, position: "root"}]
  let stackWithMetadata: WrappedTreeNode[] = []
  while(queue.length > 0) {
    let nodeAtCurrentDepth = queue.length
    for(let i=0; i<nodeAtCurrentDepth; i++){
      const element = queue.shift()
      if(element === undefined){continue} //pacify typescript
      const wrappedNode = new WrappedTreeNode({
        nodeIndex: stackWithMetadata.length,
        #parentIndex: element.#parentIndex,
        leftIndex: null,
        rightIndex: null,
        node: element.node,
        metadata: undefined
      })
      stackWithMetadata.push(wrappedNode)
      if(element.#parentIndex !== null){
        if(element.position === "left"){
          stackWithMetadata[element.#parentIndex].leftIndex = wrappedNode.nodeIndex
        }else if(element.position === "right"){
          stackWithMetadata[element.#parentIndex].rightIndex = wrappedNode.nodeIndex
        }
      }
      if(element.node.left !== null){
        queue.push({node: element.node.left, #parentIndex: wrappedNode.nodeIndex, position: "left"})
      }
      if(element.node.right !== null){
        queue.push({node: element.node.right, #parentIndex: wrappedNode.nodeIndex, position: "right"})
      }
    }
  }
  for(let i=stackWithMetadata.length-1;i>=0;i--){
    if(stackWithMetadata[i].leftIndex === null && stackWithMetadata[i].rightIndex === null){
      stackWithMetadata[i].metadata.diameterIfIsRootOfDiameter = 0
      stackWithMetadata[i].metadata.diameterIfIsNotRootOfDiameter = 1
    }
    
    let leftDiameter = 0
    let rightDiameter = 0
    const leftIndex = stackWithMetadata[i].leftIndex
    if(leftIndex !== null){
      //assumed to be filled already because we are going from the top of the stack (the childrens to #parents)
      leftDiameter = stackWithMetadata[leftIndex].metadata.diameterIfIsNotRootOfDiameter ?? 0
    }
    const rightIndex = stackWithMetadata[i].rightIndex
    if(rightIndex !== null){
      //assumed to be filled already because we are going from the top of the stack (the childrens to #parents)
      rightDiameter = stackWithMetadata[rightIndex].metadata.diameterIfIsNotRootOfDiameter ?? 0
    }
    stackWithMetadata[i].metadata.diameterIfIsRootOfDiameter = leftDiameter + rightDiameter
    diameter = Math.max(diameter, stackWithMetadata[i].metadata.diameterIfIsRootOfDiameter ?? 0)
    stackWithMetadata[i].metadata.diameterIfIsNotRootOfDiameter = 1 + Math.max(leftDiameter, rightDiameter)
  }

  return diameter
};

const e = new TreeNode(5, null, null)
const d = new TreeNode(4, null, null)
const b = new TreeNode(2, d, e)
const c = new TreeNode(3, null, null)
const a = new TreeNode(1, b, c)
console.log(diameterOfBinaryTree(a))