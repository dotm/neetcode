/*
According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	function dfs(
    root: TreeNode | null, p: TreeNode | null, q: TreeNode | null
  ): {
    valFound: TreeNode | null,
    containsP: boolean,
    containsQ: boolean,
  } {
    if(root === null){
      return {valFound: null, containsP: false, containsQ: false}
    }
    const leftResult = dfs(root.left,p,q)
    const rightResult = dfs(root.right,p,q)
    if(leftResult.valFound !== null){
      return leftResult
    }
    if(rightResult.valFound !== null){
      return rightResult
    }
    if(
      (leftResult.containsP && rightResult.containsQ) ||
      (rightResult.containsP && leftResult.containsQ) ||
      (leftResult.containsP && root.val === q.val) ||
      (leftResult.containsQ && root.val === p.val) ||
      (rightResult.containsP && root.val === q.val) ||
      (rightResult.containsQ && root.val === p.val)
    ){
      return {valFound: root, containsP: true, containsQ: true}
    }
    if(root.val === p.val){
      return {valFound: null, containsP: true, containsQ: false}
    }
    if(root.val === q.val){
      return {valFound: null, containsP: false, containsQ: true}
    }
    return {
      valFound: null,
      containsP: leftResult.containsP || rightResult.containsP,
      containsQ: leftResult.containsQ || rightResult.containsQ,
    }
  }
  return dfs(root,p,q).valFound
};

const node1 = new TreeNode(1)
const node2 = new TreeNode(2)
const node4 = new TreeNode(4, null, node2)
const node3 = new TreeNode(3, node1, node4)
console.log(lowestCommonAncestor(node3, node2, node3))