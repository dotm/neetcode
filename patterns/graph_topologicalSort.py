"""
Topological Sort is ordering the vertices of a directed graph so that
for every directed edge u → v, vertex u comes before vertex v in the ordering.

Steps:
Iterate over all nodes that don't have incoming edges.
DFS using recursion while keeping watching for cycle by:
- adding the node before dfs to a cycle detection set
- call dfs on the neighbors
- removing the node from the set after calling dfs.
- Keep track of visited node using a visited set to be used as a cache.
- Process the node:
  - Once you reach a leaf without outgoing edges (or all the outgoing edges is already visited), add it to the end of the result list.
Return the result list.
"""