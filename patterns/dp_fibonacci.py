"""
Break the problem into subproblem and then cache the result for top down dynamic programming (memoization).
  To find subproblem, look for repeated work in the decision tree (backtracking).
And then you can find the structure of the problem to create a bottom up solution
  using array where the elements are the solution at that index (the index is the input).
And then when the bottom up solution become clear, you can remove the cache (the array) altogether.
  Replace the cache with a few variables to optimize memory.
"""

class Solution:
  def fib(self, n: int) -> int:
    cache = {0: 0, 1: 1} #{n: fib(n)}
    def dfs(n):
      if n in cache: #check if n is already calculated
        return cache[n] #this is the cache
      cache[n] = dfs(n-1) + dfs(n-2) #this is the subproblem
      return cache[n]
    return dfs(n)

class Solution:
  def fib(self, n: int) -> int: #without any array for cache
    if n == 0: return 0
    if n == 1: return 1
    
    i = 2 #start at n=2
    smallerNum = 0 #start at n=0
    largerNum = 1 #start at n=1
    while i <= n:
      sumAtI = smallerNum + largerNum
      smallerNum = largerNum
      largerNum = sumAtI
      i += 1
    return largerNum
