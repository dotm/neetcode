from typing import List
from collections import defaultdict

def pretty_print_dict(dictionary):
  for key, value in dictionary.items():
    print(f"{key}: {value}")

class Solution:
  def minCostConnectPoints(self, points: List[List[int]]) -> int:
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
  
print(Solution().minCostConnectPoints([[-8,14],[16,-18],[-19,-13],[-18,19],[20,20],[13,-20],[-15,9],[-4,-8]]))