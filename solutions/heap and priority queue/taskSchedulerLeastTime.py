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
