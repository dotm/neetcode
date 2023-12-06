"""
105. Construct Binary Tree from Preorder and Inorder Traversal
Medium
14.3K
440
Companies
Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

 

Example 1:


Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
Example 2:

Input: preorder = [-1], inorder = [-1]
Output: [-1]
 

Constraints:

1 <= preorder.length <= 3000
inorder.length == preorder.length
-3000 <= preorder[i], inorder[i] <= 3000
preorder and inorder consist of unique values.
Each value of inorder also appears in preorder.
preorder is guaranteed to be the preorder traversal of the tree.
inorder is guaranteed to be the inorder traversal of the tree.
"""
from typing import List
from typing import Optional

# Definition for a binary tree node.
class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right

class Solution:
  def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
    #preorder sorting: process root, and then left child (recursively), and then right child (recursively)
    #property: the root is always at the first index of the array.
    
    #inorder sorting: process left-most (recursively), and then back up to it's parent (root), and then right child
    #property: the left side from the root in the array is it's left children, the right side from the root in the array is it's right children.

    #recursion's base case
    if not preorder or not inorder:
      return None
    
    root = TreeNode(preorder[0])
    midIndex = inorder.index(preorder[0])
    leftChildStart = 1 #because 0 is the root
    leftChildEnd = midIndex + 1 #the number of left child found from inorder (beware off-by-one error from slicing list)
    rightChildStart = midIndex + 1 #the number of right child found from inorder (beware off-by-one error from slicing list)
    root.left = self.buildTree(preorder[leftChildStart:leftChildEnd],inorder[:midIndex])
    root.right = self.buildTree(preorder[rightChildStart:],inorder[midIndex+1:])
    
    return root
