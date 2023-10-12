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