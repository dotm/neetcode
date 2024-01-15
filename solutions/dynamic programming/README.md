Dynamic programming: solving problems by solving subproblems of the same type.

Sometimes, the simplest solution to a problem is backtracking.
We create and go through all the possible decision in the decision tree.
This is a brute-force solution and is not efficient.

Sometimes, this problem can be optimized by using caching.
The cache eliminates work from nodes that have the same value.
This is called top down dynamic programming.

If we can do top down using cache, we can also use bottom up.
With this approach, we go from the bottom of the tree and work our way up
to see if there's any pattern that can be found and used
to arrive at the solution for the root (top-most node).
This usually involves creating an array to store the solutions of all nodes,
and then filling them in from the bottom up.
This can be left-to-right or right-to-left of that array.

If the number of steps that need to be seen (backward or ahead) is fixed,
can then optimize the bottom up dynamic programming by not having any array at all
and instead use a fixed number of variables that can look backward or ahead.
And we might also need one or a few variables to store the accumulated result.
This will improve the memory complexity to constant time.