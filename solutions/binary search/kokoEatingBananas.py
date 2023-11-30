from typing import List
from functools import reduce
from math import ceil

class Solution:
  def minEatingSpeed(self, piles: List[int], h: int) -> int:
    startingK = 0
    endingK = max(piles)
    res = -1 #not found value

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