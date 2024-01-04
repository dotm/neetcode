"""
3651 · Number of Connected Components in an Undirected Graph
Algorithms
Medium
Accepted Rate
51%

Description
In this problem, there is an undirected graph with n nodes. There is also an edges array. Where edges[i] = [a, b] means that there is an edge between node a and node b in the graph.

You need to return the number of connected components in that graph.

Input:

3
[[0,1], [0,2]]
Output:

1
Example 2

Input:

6
[[0,1], [1,2], [2, 3], [4, 5]]
Output:

2
"""
from typing import (
  List,
)

class Solution:
  """
  @param n: the number of vertices
  @param edges: the edges of undirected graph
  @return: the number of connected components
  """
  def count_components(self, n: int, edges: List[List[int]]) -> int:
    #this map will be used to construct the tree.
    #{nodeValue:topMostParent}.
    #the 0 key will be unused.
    parentOfNodeMap = [i for i in range(n)]
    
    #rank will be used to determined how to merge to unconnected graph
    #node with bigger rank will be the parent (the topmost node will be the root)
    #the 0 key will be unused.
    rank = [1] * n

    #using Union Find algorithm to merge nodes using the edges

    #get the topmost parent of n
    def find(n):
      topMostParentOfN = n
      #while we haven't reach the top most parent
      while topMostParentOfN != parentOfNodeMap[topMostParentOfN]:
        #store the path (path compression) so that
        #we don't need to recompute the parent of the current node
        #the next time we go over it
        parentOfNodeMap[topMostParentOfN] = parentOfNodeMap[parentOfNodeMap[topMostParentOfN]]

        #iterate upward
        topMostParentOfN = parentOfNodeMap[topMostParentOfN]
      
      return topMostParentOfN
    
    def union(n1,n2):
      topMostParentOfN1 = find(n1)
      topMostParentOfN2 = find(n2)
      if topMostParentOfN1 == topMostParentOfN2:
        return 0 #already unioned (no need to decrease unconnectedNodeCount)
      
      #do union
      if rank[topMostParentOfN1] > rank[topMostParentOfN2]:
        parentOfNodeMap[topMostParentOfN2] = topMostParentOfN1
        rank[topMostParentOfN1] += rank[topMostParentOfN2]
      else:
        parentOfNodeMap[topMostParentOfN1] = topMostParentOfN2
        rank[topMostParentOfN2] += rank[topMostParentOfN1]
      return 1 #new connection is made, so decrement unconnectedNodeCount
    
    unconnectedNodeCount = n
    for n1,n2 in edges:
      unconnectedNodeCount -= union(n1,n2)
    return unconnectedNodeCount