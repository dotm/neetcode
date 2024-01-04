"""
684. Redundant Connection (Union Find Algorithm)
Medium
5.9K
381
Companies
In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

 

Example 1:


Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Example 2:


Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
 

Constraints:

n == edges.length
3 <= n <= 1000
edges[i].length == 2
1 <= ai < bi <= edges.length
ai != bi
There are no repeated edges.
The given graph is connected.
"""
from typing import List

class Solution:
  def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
    #this map will be used to construct the tree.
    #{nodeValue:topMostParent}.
    #the 0 key will be unused.
    parentOfNodeMap = [i for i in range(len(edges)+1)]
    
    #rank will be used to determined how to merge to unconnected graph
    #node with bigger rank will be the parent (the topmost node will be the root)
    #the 0 key will be unused.
    rank = [1] * (len(edges)+1)

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
    
    #return False if already unioned (cycle detected)
    def union(n1,n2):
      topMostParentOfN1 = find(n1)
      topMostParentOfN2 = find(n2)
      if topMostParentOfN1 == topMostParentOfN2:
        return False
      
      #do union
      if rank[topMostParentOfN1] > rank[topMostParentOfN2]:
        parentOfNodeMap[topMostParentOfN2] = topMostParentOfN1
        rank[topMostParentOfN1] += rank[topMostParentOfN2]
      else:
        parentOfNodeMap[topMostParentOfN1] = topMostParentOfN2
        rank[topMostParentOfN2] += rank[topMostParentOfN1]
      return True

    for n1,n2 in edges:
      if union(n1,n2) == False:
        return [n1,n2]
    
    #this should not run because the problem statement makes it impossible
    #if total nodes = total edges, then there'll be a cycle in the graph
    return []