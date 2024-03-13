"""
332. Reconstruct Itinerary
Solved
Hard
Topics
Companies
You are given a list of airline tickets where tickets[i] = [from_i, to_i] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

 

Example 1:


Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
Example 2:


Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.
 

Constraints:

1 <= tickets.length <= 300
tickets[i].length == 2
from_i.length == 3
to_i.length == 3
from_i and to_i consist of uppercase English letters.
from_i != to_i
"""

from typing import List

class Solution:
  def findItinerary(self, tickets: List[List[str]]) -> List[str]:
    adjacencyList = {src: [] for src, dst in tickets}
    result = []

    for src, dst in tickets:
      adjacencyList[src].append(dst)

    for key in adjacencyList:
      adjacencyList[key].sort()

    def dfs(adj, src):
      if src in adj:
        destinations = adj[src][:]
        while destinations:
          dest = destinations[0]
          adj[src].pop(0)
          dfs(adj, result, dest)
          destinations = adj[src][:]
      result.append(src)

    dfs(adjacencyList, result, "JFK")
    result.reverse()

    if len(result) != len(tickets) + 1:
      return []

    return result