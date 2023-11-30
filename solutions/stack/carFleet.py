from typing import List

class Solution:
  def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
    cars = [(p, s) for p, s in zip(position, speed)]
    cars.sort(reverse=True) #furthest position at index 0
    stack = [] #stack is the list of car fleet, represented by the car data in front
    for carPosition, carSpeed in cars:
      distanceFromTarget = target - carPosition
      willReachTargetIn = distanceFromTarget / carSpeed
      stack.append(willReachTargetIn)
      if len(stack) > 1 and stack[-1] <= stack[-2]:
        #if the car behind is faster or is as fast
        # (reach target in less time or equal time)
        # than the car in front
        stack.pop()
        #we can treat them as one fleet (so we pop the car behind from the stack)
    return len(stack)
