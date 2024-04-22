"""
0/1 Knapsack means for each input, you can either include it or not.
As usual, try creating the decision tree first (brute-force backtrack).
  Use a table like in dp_zeroOneKnapsack.png image.
    The T is the target where we want to reach.
    We start from top left and go toward the target
      For each input we can choose to not include it (go down only one step)
      or include it (go down one step, and to the right one or multiple steps).
Find the subproblem structure, and then implement with memoization cache.
Then you can try using bottom up, and then removing the cache.
"""