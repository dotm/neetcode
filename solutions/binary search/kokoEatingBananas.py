"""
875. Koko Eating Bananas
Medium

Koko loves to eat bananas. There are n piles of bananas, the i-th pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

 

Example 1:

Input: piles = [3,6,7,11], h = 8
Output: 4
Example 2:

Input: piles = [30,11,23,4,20], h = 5
Output: 30
Example 3:

Input: piles = [30,11,23,4,20], h = 6
Output: 23
 

Constraints:

1 <= piles.length <= 104
piles.length <= h <= 109
1 <= piles[i] <= 109
"""
from typing import List
from functools import reduce
from math import ceil

class Solution:
  def minEatingSpeed(self, piles: List[int], h: int) -> int:
    startingK = 0
    endingK = max(piles)
    res = -1 #not found value

    #binary search to find min k possible
    while startingK <= endingK:
      k = (startingK + endingK) // 2
      if k == 0:
        break

      hoursSpentEating = reduce(
        lambda acc, val: acc + ceil(val/k), piles, 0
      )
      canEatPilesWithinH = hoursSpentEating <= h
      if canEatPilesWithinH:
        res = k
        endingK = k-1
      else:
        startingK = k+1

    return res

print(Solution().minEatingSpeed([312884470],968709470))