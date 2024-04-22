"""
Unbounded Knapsack means for each input, you can use it an infinite number of time (or not use it at all).
Use a table like in dp_UnboundedKnapsack.png image.
  The T is the target where we want to reach.
  For each input we can choose to not use it at all (go down one step)
  or use it (go to the right multiple steps) and stop using it at any point (go down one step).
We actually do bottom up dynamic programming here: start from the bottom row (right-to-left) and going up (below-to-top)
  because the solution at a cell depends on the solution at its bottom and right.
Then we can also optimize the memory optimized by storing two most bottom rows only
  and replacing them with the help of one iterator row as we move upward toward the top left.
"""