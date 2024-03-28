"""
295. Find Median from Data Stream
Solved
Hard
Topics
Companies
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
 

Example 1:

Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
 

Constraints:

-10^5 <= num <= 10^5
There will be at least one element in the data structure before calling findMedian.
At most 5 * 10^4 calls will be made to addNum and findMedian.
 

Follow up:

If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
"""
import heapq

class MedianFinder:

  def __init__(self):
    self.smallMaxHeap = [] #python doesn't have maxHeap so we need to invert the value here with -1
    self.largeMinHeap = []

  def addNum(self, num: int) -> None:
    #insert to one heap
    if self.largeMinHeap and num > self.largeMinHeap[0]:
      #if num is larger than largeMinHeap's smallest number
      heapq.heappush(self.largeMinHeap, num)
    else:
      heapq.heappush(self.smallMaxHeap, -1 * num)
    #balance the heaps size
    if len(self.smallMaxHeap) > len(self.largeMinHeap) + 1:
      val = -1 * heapq.heappop(self.smallMaxHeap)
      heapq.heappush(self.largeMinHeap, val)
    if len(self.largeMinHeap) > len(self.smallMaxHeap) + 1:
      val = heapq.heappop(self.largeMinHeap)
      heapq.heappush(self.smallMaxHeap, -1 * val)

  def findMedian(self) -> float:
    if len(self.smallMaxHeap) > len(self.largeMinHeap):
      return -1 * self.smallMaxHeap[0]
    elif len(self.largeMinHeap) > len(self.smallMaxHeap):
      return self.largeMinHeap[0]
    else:
      return (-1 * self.smallMaxHeap[0] + self.largeMinHeap[0]) / 2.0


# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()