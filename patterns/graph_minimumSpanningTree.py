"""
Minimum Spanning Tree: what's the edges to connect all nodes with the smallest distance cost possible.
You can solve minimum spanning tree using either Prim's or Kruskal's algorithm
- Kruskal's:
  - Sort the edges by distance.
  - Iterate from the smallest distance.
  - If the two node doesn't have the same top most parent, connect them with union find.
    If they have the same top most parent, they're already connected.
    Either way, move to the next edge.
- Prim's:
  - Keep track of visited node.
  - From one arbitrary node, get all of its edges and put it into a min heap.
  - Get the minimum value from the heap and visit the outbound node if it haven't been visited
    (get all of its edges and put it into the min heap).
  - Do this until all nodes have been visited (assuming all nodes are connected).
"""

from typing import List
from collections import defaultdict
import heapq

class Solution:
  def minCostConnectPoints_prim(self, points: List[List[int]]) -> int:
    pointsCount = len(points)

    #create adjacencyList
    adjacencyList = {i: [] for i in range(pointsCount)} #{pointIndex: (costToAnotherPointIndex, anotherPointIndex)[]}
    for i in range(pointsCount):
      x1, y1 = points[i]
      for j in range(i+1, pointsCount):
        x2, y2 = points[j]
        manhattanDistance = abs(x1-x2) + abs(y1-y2)
        adjacencyList[i].append((manhattanDistance, j))
        adjacencyList[j].append((manhattanDistance, i))
    
    #Prim's algorithm:
    # what's the shortest path to an unvisited node from all the nodes we've visited.
    #Using Adjacency List, BFS, and Min Heap.
    result = 0
    visited = set()
    minHeap = [(0,0)] #(cost, pointIndex)[]. init to (0,0) because the cost of point of index 0 to itself is 0
    while len(visited) < pointsCount: #minimum spanning tree hasn't been completed
      cost, pointIndex = heapq.heappop(minHeap)
      if pointIndex in visited:
        continue
      result += cost
      visited.add(pointIndex)
      for neighborCost, neighborIndex in adjacencyList[pointIndex]:
        if neighborIndex not in visited:
          heapq.heappush(minHeap, (neighborCost, neighborIndex))
    return result

class Solution:
  def minCostConnectPoints_kruskal(self, points: List[List[int]]) -> int:
    pointsCount = len(points)
    edgeListSortedByWeight = [] #(weight, point1, point2)
    for edge in range(pointsCount):
      x1, y1 = points[edge]
      for j in range(edge+1, pointsCount):
        x2, y2 = points[j]
        manhattanDistance = abs(x1-x2) + abs(y1-y2)
        edgeListSortedByWeight.append((manhattanDistance, (x1,y1), (x2,y2)))
    edgeListSortedByWeight.sort()

    minimumSpanningTreeEdges = []
    topMostParentOfPoint = {} #{(point1): (topMostParentOfPoint1)}
    childrenOfPoint = defaultdict(list) #{(point1): [(childrenOfPoint1)]} used for union find
    for edge in edgeListSortedByWeight:
      point1 = edge[1]
      point2 = edge[2]
      if (
        point1 in topMostParentOfPoint
        and point2 in topMostParentOfPoint
        and topMostParentOfPoint[point1] == topMostParentOfPoint[point2]
      ):
        if len(minimumSpanningTreeEdges) == len(points)-1:
          break #the minimum spanning tree is already complete
        continue #these 2 nodes is already part of the minimum spanning tree
      
      #union find
      if point1 not in topMostParentOfPoint and point2 not in topMostParentOfPoint:
        childrenOfPoint[point1].append(point2)
        topMostParentOfPoint[point1] = point1
        topMostParentOfPoint[point2] = point1
      elif point1 in topMostParentOfPoint and point2 not in topMostParentOfPoint:
        childrenOfPoint[topMostParentOfPoint[point1]].append(point2)
        topMostParentOfPoint[point2] = topMostParentOfPoint[point1]
      elif point1 not in topMostParentOfPoint and point2 in topMostParentOfPoint:
        childrenOfPoint[topMostParentOfPoint[point2]].append(point1)
        topMostParentOfPoint[point1] = topMostParentOfPoint[point2]
      else: #merging two unconnected trees
        #move all nodes belonging to the same tree as point2 to the tree of point1
        prevTopMostParentOfPoint2 = topMostParentOfPoint[point2]
        for point in childrenOfPoint[prevTopMostParentOfPoint2]:
          childrenOfPoint[topMostParentOfPoint[point1]].append(point)
          topMostParentOfPoint[point] = topMostParentOfPoint[point1]
        del childrenOfPoint[prevTopMostParentOfPoint2]
        childrenOfPoint[topMostParentOfPoint[point1]].append(point2)
        topMostParentOfPoint[point2] = topMostParentOfPoint[point1]
        childrenOfPoint[topMostParentOfPoint[point1]].append(prevTopMostParentOfPoint2)
        topMostParentOfPoint[prevTopMostParentOfPoint2] = topMostParentOfPoint[point1] #also move the root of the point2 tree
      minimumSpanningTreeEdges.append(edge)
    
    minCost = 0
    for edge in minimumSpanningTreeEdges:
      weight = edge[0]
      minCost += weight
    return minCost
  