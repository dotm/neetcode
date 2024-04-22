"""
Union Find: Merge unconnected components into one graph by looping through all the edges and doing The Process
The Process: Union two nodes after Finding top most parent of both of them
Union: make top most parent of one node the parent of the other node.
  Rank is used to optimize the Union operation (smaller tree is always attached to the root of the larger tree)
  and prevents the trees from becoming too imbalanced, which would lead to inefficient find operations.
Find: find the top most parent of one node.
  Path compression (caching) is used to optimize the time to find the top most parent.
"""