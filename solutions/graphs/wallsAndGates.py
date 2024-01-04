"""
663 · Walls and Gates
Algorithms
Medium
Accepted Rate
54%

Description
Solution54
Notes
Discuss99+
Leaderboard
Record

Description
You are given a m x n 2D grid initialized with these three possible values.

-1 - A wall or an obstacle.
0 - A gate.
INF - Infinity means an empty room. We use the value 2^31 - 1 = float("inf") to represent INF as you may assume that the distance to a gate is less than float("inf").
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a Gate, that room should remain filled with INF

Example
Example1

Input:
[[float("inf"),-1,0,float("inf")],[float("inf"),float("inf"),float("inf"),-1],[float("inf"),-1,float("inf"),-1],[0,-1,float("inf"),float("inf")]]
Output:
[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]

Explanation:
the 2D grid is:
INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF
the answer is:
  3  -1   0   1
  2   2   1  -1
  1  -1   2  -1
  0  -1   3   4
Example2

Input:
[[0,-1],[float("inf"),float("inf")]]
Output:
[[0,-1],[1,2]]
"""
from typing import (
  List,
)
from collections import deque

class Solution:
  """
  @param rooms: m x n 2D grid
  @return: nothing
  """
  def walls_and_gates(self, rooms: List[List[int]]):
    # write your code here
    rowCount = len(rooms)
    colCount = len(rooms[0])
    
    visited = set()
    queue = deque()
    for row in range(rowCount):
      for col in range(colCount):
        if rooms[row][col] == 0:
          #add all gates as bfs starting points
          queue.append((row,col))
          visited.add((row,col))

    def bfs_addRooms(row,col):
      outOfBounds = row < 0 or col < 0 or row >= rowCount or col >= colCount
      if outOfBounds:
        return
      if (row,col) in visited:
        return
      if rooms[row][col] == -1: #a wall
        return
      queue.append((row,col))
      visited.add((row,col))
    distance = 0
    while queue:
      for i in range(len(queue)):
        row,col = queue.popleft()
        bfs_addRooms(row+1,col)
        bfs_addRooms(row-1,col)
        bfs_addRooms(row,col+1)
        bfs_addRooms(row,col-1)
        rooms[row][col] = distance
      distance += 1

aoa=[
  [float("inf"),-1,0,float("inf")],
  [float("inf"),float("inf"),float("inf"),-1],
  [float("inf"),-1,float("inf"),-1],
  [0,-1,float("inf"),float("inf")]
]
Solution().walls_and_gates(aoa)
print(aoa)