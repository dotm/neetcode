"""
743. Network Delay Time
Solved
Medium
Topics
Companies
Hint
You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.

We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

 

Example 1:


Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
Example 2:

Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
Example 3:

Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
 

Constraints:

1 <= k <= n <= 100
1 <= times.length <= 6000
times[i].length == 3
1 <= ui, vi <= n
ui != vi
0 <= wi <= 100
All the pairs (ui, vi) are unique. (i.e., no multiple edges.)
"""
from typing import List
import heapq
import collections

class Solution:
  def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    edges = collections.defaultdict(list) #{source: (target,delay)}
    for source, target, delay in times:
      edges[source].append((target, delay))
    
    #Dijkstra shortest path to all nodes from one node
    #  defines the maximum weight distance of the graph from a node
    #  (the network delay time from one original source)
    
    minHeap = [(0,k)]
    #(delay,target)[]. init to (0,k) because delay from k to itself is 0
    
    visited = set()
    time = 0
    while minHeap:
      delay1, target1 = heapq.heappop(minHeap)
      if target1 in visited:
        continue
      visited.add(target1)
      time = delay1
      
      for target2, delay2 in edges[target1]:
        if target2 in visited: continue
        heapq.heappush(minHeap, (delay1+delay2, target2))
    return time if len(visited) == n else -1 #-1 if not all node can receive signal
