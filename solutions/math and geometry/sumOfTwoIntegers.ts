/**
371. Sum of Two Integers
Medium

Given two integers a and b, return the sum of the two integers without using the operators + and -.

Example 1:

Input: a = 1, b = 2
Output: 3
Example 2:

Input: a = 2, b = 3
Output: 5

Constraints:

-1000 <= a, b <= 1000
*/
function getSum(a: number, b: number): number {
  while(b!==0){ //we'll use be to store carry. so while there's still carry, keep adding
    const carry = (a & b) << 1
    a = a ^ b //XOR because 1+1=10 (and the 1 carry is already stored in carry const)
    b = carry
  }
  //NOTE: negative a and b are already handled by the bit/internal representation of number in JS
  return a
};