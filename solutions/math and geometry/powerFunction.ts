/*
50. Pow(x, n)
Medium
9.1K
8.9K
Companies
Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

 

Example 1:

Input: x = 2.00000, n = 10
Output: 1024.00000
Example 2:

Input: x = 2.10000, n = 3
Output: 9.26100
Example 3:

Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25
 

Constraints:

-100.0 < x < 100.0
-231 <= n <= 231-1
n is an integer.
Either x is not zero or n > 0.
-104 <= xn <= 104
*/
function myPower(x: number, n: number): number {
  if(n===0){return 1}
  if(n<0){
    n = Math.abs(n)
    x = 1/x
  }
  if(n%2===0) {
    //x*x so that we can recurse once.
    // x^n = x^(n-2) * x^(n-2) = x^(2^(n-2)) = (x*x)^(n-2)
    //need to recurse only once so time limit is not exceeded.
    return myPower(x*x, n/2)
  } else {
    return x*myPower(x*x, (n-1)/2)
  }
};