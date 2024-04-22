"""
Longest Common Subsequence.
Use a table like in dp_longestCommonSubsequence.png image.
  We actually do bottom up dynamic programming here: start from the bottom row (right-to-left) and going up (below-to-top)
    because the solution at a cell depends on the solution at its bottom and right.
  If there's a match in character, we can add one to the solution
Then we can also optimize the memory optimized by storing two most bottom rows only
  and replacing them with the help of one iterator row as we move upward toward the top left.
"""