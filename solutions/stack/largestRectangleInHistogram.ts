/*
84. Largest Rectangle in Histogram
Hard
16.3K
238
Companies
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

 

Example 1:


Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
Example 2:


Input: heights = [2,4]
Output: 4
 

Constraints:

1 <= heights.length <= 10^5
0 <= heights[i] <= 10^4
*/
function largestRectangleArea(heights: number[]): number {
  let maxArea = 0;
  const stack: [number, number][] = []; // [(index, height)]

  for (let currentBarIndex = 0; currentBarIndex < heights.length; currentBarIndex++) {
    const currentBarHeight = heights[currentBarIndex];
    let currentBarRectStartsFrom = currentBarIndex;
    while (stack.length > 0 && stack[stack.length - 1][1] > currentBarHeight) {
      // while previousBarHeight > currentBarHeight
      const [previousBarStartIndex, previousBarHeight] = stack.pop()!;
      // move the start point of current bar
      currentBarRectStartsFrom = previousBarStartIndex;
      // calculate previous bar's max area before totally forgetting about it
      const previousBarLength = currentBarIndex - previousBarStartIndex;
      maxArea = Math.max(maxArea, previousBarHeight * previousBarLength);
    }
    stack.push([currentBarRectStartsFrom, currentBarHeight]);
  }

  // calculate areas for remaining bars in stack
  while (stack.length > 0) {
    const [currentBarStartIndex, currentBarHeight] = stack.pop()!;
    const currentBarLength = heights.length - currentBarStartIndex;
    maxArea = Math.max(maxArea, currentBarHeight * currentBarLength);
  }

  return maxArea;
}
