/*
70. Climbing Stairs
Easy
20.5K
708
Companies
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 

Constraints:

1 <= n <= 45
*/
function climbStairs(n: number): number {
  let solutionForRightElement = 1 //initialize for the n-th step
  let solutionForLeftElement = 1 //initialize for n-1 step of which there's only 1 solution (take 1 step)
  let tmp = 0
  for(
    let i=n-2; //because 2 of the solutions has been initialized above
    i>=0;
    i--
  ){
    //shift to the left
    tmp = solutionForLeftElement + solutionForRightElement
    solutionForRightElement = solutionForLeftElement
    solutionForLeftElement = tmp
  }
  return solutionForLeftElement
};