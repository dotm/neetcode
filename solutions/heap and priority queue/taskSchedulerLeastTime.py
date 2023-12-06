"""
621. Task Scheduler
Medium
9.2K
1.9K
Companies
Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

 

Example 1:

Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.
Example 2:

Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: On this case any permutation of size 6 would work since n = 0.
["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...
And so on.
Example 3:

Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation: 
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
 

Constraints:

1 <= task.length <= 104
tasks[i] is upper-case English letter.
The integer n is in the range [0, 100].
"""
from typing import List
from collections import Counter
from collections import deque
import heapq

class Solution:
  def leastInterval(self, tasks: List[str], n: int) -> int:
    counterObj = Counter(tasks) #{taskLetter: taskCount}
    #Python heapq.heapify only support minheap
    # so we make the taskCount negative
    maxHeap = [-taskCount for taskCount in counterObj.values()]
    heapq.heapify(maxHeap)
    
    #deque has quicker append and pop operations
    # from both ends of the container
    # compared to normal list
    idlingTaskQueue = deque() #[(-taskCount, idleTime)]
    #idlingTaskQueue is used to put idling tasks

    time = 0

    while maxHeap or idlingTaskQueue:
      time += 1
      
      if maxHeap:
        taskCount = 1 + heapq.heappop(maxHeap) #decrease the taskCount by 1
        if taskCount:
          #if the task is not finished, add it to idlingTaskQueue
          # with time equals current time + idling time (n)
          idlingTaskQueue.append((taskCount, time + n))
      else:
        #if all tasks are finished except idling tasks
        #fast forward to the earliest idling task's time
        time = idlingTaskQueue[0][1]
      
      if idlingTaskQueue and idlingTaskQueue[0][1] == time:
        #if the earliest task can be moved out of idle status
        # move the taskCount back to the heap to be processed
        heapq.heappush(maxHeap, idlingTaskQueue.popleft()[0])
    
    return time
