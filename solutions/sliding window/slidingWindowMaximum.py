"""
239. Sliding Window Maximum
Solved
Hard
Topics
Companies
Hint
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

 

Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
1 <= k <= nums.length
"""
import collections
from typing import List

class Solution:
  def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
    output = []
    q = collections.deque() #contain index of nums. the value of the index should be monotonically decreasing (e.g. [8,7,7,5,2])
    l = 0 #left index for window
    r = 0 #right index for window
    while r < len(nums): #while right index is not out of bounds
      while q and nums[q[-1]] < nums[r]: #if rightmost value is less than current num
        q.pop() #remove from last index so that the queue keeps it monotonically decreasing property
      q.append(r)

      #remove leftmost value as the window's left index move to the right
      if l > q[0]:
        q.popleft()
      
      if (r+1) >= k:
        #only start appending to output once window is of size k
        output.append(nums[q[0]]) #largest value is at index 0 of queue
        l += 1
      
      r += 1
    return output