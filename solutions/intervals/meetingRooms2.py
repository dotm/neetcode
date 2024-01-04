"""
919 · Meeting Rooms II
Algorithms
Medium
Accepted Rate
53%

Description
Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.)

(0,8),(8,10) is not conflict at 8

Example
Example1

Input: intervals = [(0,30),(5,10),(15,20)]
Output: 2
Explanation:
We need two meeting rooms
room1: (0,30)
room2: (5,10),(15,20)
Example2

Input: intervals = [(2,7)]
Output: 1
Explanation: 
Only need one meeting room
"""
from typing import (
  List,
)

class Interval(object):
  def __init__(self, start, end):
    self.start = start
    self.end = end

class Solution:
  """
  @param intervals: an array of meeting time intervals
  @return: the minimum number of conference rooms required
  """
  def min_meeting_rooms(self, intervals: List[Interval]) -> int:
    startList = sorted([i.start for i in intervals])
    endList = sorted([i.end for i in intervals])

    maxCount = 0
    currentCount = 0
    startIndex = 0
    endIndex = 0
    while startIndex < len(intervals):
      #use start because it's more relevant
      #(a new room might be needed if a meeting is started but never when on is ending)
      if startList[startIndex] < endList[endIndex]:
        #a meeting started before another meeting ends
        #so a new room is required
        startIndex += 1
        currentCount += 1
      else:
        #a meeting start just after or after another meeting ends
        endIndex += 1
        currentCount -= 1
      maxCount = max(maxCount, currentCount)
    return maxCount