"""
518. Coin Change II
Solved
Medium
Topics
Companies
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

 

Example 1:

Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
Example 2:

Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.
Example 3:

Input: amount = 10, coins = [10]
Output: 1
 

Constraints:

1 <= coins.length <= 300
1 <= coins[i] <= 5000
All the values of coins are unique.
0 <= amount <= 5000
"""
from typing import List

class Solution:
  def change_usingMemoization(self, amount: int, coins: List[int]) -> int:
    # Time: O(amount * coins)
    # Memory: O(amount * coins)
    cache = {}
    def dfs(indexInCoins, sumAmount):
      if sumAmount == amount:
        return 1
      if sumAmount > amount:
        return 0 #overshoot the target amount
      if indexInCoins == len(coins):
        return 0 #no more coins to be added
      if (indexInCoins, sumAmount) in cache:
        return cache[(indexInCoins, sumAmount)]
      cache[(indexInCoins, sumAmount)] = dfs(
          #case when we use coin at index
          indexInCoins, sumAmount + coins[indexInCoins]
        ) + dfs(
          #case when we go to the next index instead
          indexInCoins+1, sumAmount
        )
      return cache[(indexInCoins, sumAmount)]
    return dfs(0,0)
  
  def change_usingDynamicProgramming(self, amount: int, coins: List[int]) -> int:
    # Time: O(amount * coins)
    # Memory: O(amount * coins)
    cache = [[0] * (len(coins)+1) for i in range(amount+1)]
    
    cache[0] = [1] * (len(coins)+1)
    #because we can have 1 way for all coins to reach the amount 0

    for sumAmount in range(1, amount+1):
      for i in range(len(coins)-1, -1, -1):
        cache[sumAmount][i] = cache[sumAmount][i+1]
        if sumAmount - coins[i] >= 0: #doesn't overshoot target amount
          cache[sumAmount][i] += cache[sumAmount - coins[i]][i]
    return cache[amount][0]

  def change_usingOptimizedDynamicProgramming(self, amount: int, coins: List[int]) -> int:
    # Time: O(amount * coins)
    # Memory: O(amount)
    cache = [0] * (amount+1)
    
    cache[0] = 1
    #because we can have 1 way for all coins to reach the amount 0

    for i in range(len(coins)-1, -1, -1):
      nextCache = [0] * (amount+1)
      
      nextCache[0] = 1
      #because we can have 1 way for all coins to reach the amount 0

      for sumAmount in range(1, amount+1):
        nextCache[sumAmount] = cache[sumAmount]
        if sumAmount - coins[i] >= 0: #doesn't overshoot target amount
          nextCache[sumAmount] += nextCache[sumAmount - coins[i]]
      cache = nextCache
    return cache[amount]