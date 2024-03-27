/*
42. Trapping Rain Water
Hard

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example 1:


Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
 

Constraints:

n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5
*/

function trap(height: number[]): number {
  if (height.length < 3) {
    // can't trap water with less than 3
    return 0;
  }

  let leftPointerIndex: number = 0;
  let rightPointerIndex: number = height.length - 1;
  let leftMaxHeight: number = 0;
  let rightMaxHeight: number = 0;

  let trappedWater: number = 0;

  while ((leftPointerIndex + 1) < rightPointerIndex) {
    leftMaxHeight = Math.max(leftMaxHeight, height[leftPointerIndex]);
    rightMaxHeight = Math.max(rightMaxHeight, height[rightPointerIndex]);

    let lowestHeightOfBothSide: number = -1;
    let heightOfWater: number = -1;

    if (leftMaxHeight < rightMaxHeight) {
      lowestHeightOfBothSide = leftMaxHeight;
      leftPointerIndex += 1;
      heightOfWater = Math.max(0, lowestHeightOfBothSide - height[leftPointerIndex]);
    } else {
      lowestHeightOfBothSide = rightMaxHeight;
      rightPointerIndex -= 1;
      heightOfWater = Math.max(0, lowestHeightOfBothSide - height[rightPointerIndex]);
    }

    trappedWater += heightOfWater;
  }

  return trappedWater;
}
