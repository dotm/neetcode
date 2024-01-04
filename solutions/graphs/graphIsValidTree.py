"""
178 · Graph Valid Tree
Algorithms
Medium
Accepted Rate
36%

Description
Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

Example
Example 1:

Input: n = 5 edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
Output: true.
Example 2:

Input: n = 5 edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
Output: false.
"""
from typing import (
  List,
)

class Solution:
  """
  @param n: An integer
  @param edges: a list of undirected edges
  @return: true if it's a valid tree, or false
  """
  def valid_tree(self, n: int, edges: List[List[int]]) -> bool:
    #graph with no node is a valid tree
    if n == 0: return True

    adjacencyList = {i:[] for i in range(n)}
    for n1,n2 in edges:
      adjacencyList[n1].append(n2)
      adjacencyList[n2].append(n1)
    
    visiting = set() #cycleDetectionSet
    def dfs(node, previousNode):
      if node in visiting:
        return False #graph with cycle is not a tree
      visiting.add(node)
      for neighbor in adjacencyList[node]:
        if neighbor == previousNode:
          continue #don't process
        if dfs(neighbor, node) == False:
          return False #cycle already detected
      return True
    
    noCycleDetected = dfs(0, -1) #use -1 since it's outside of the range 0 to n-1 (to not trigger the continue)
    allNodesAreConnected = n == len(visiting) #must be init after dfs is done (because this use visiting set)
    return noCycleDetected and allNodesAreConnected
