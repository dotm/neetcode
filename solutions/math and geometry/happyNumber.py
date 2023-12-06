"""
202. Happy Number
Easy
9.8K
1.3K
Companies
Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

 

Example 1:

Input: n = 19
Output: true
Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
Example 2:

Input: n = 2
Output: false
 

Constraints:

1 <= n <= 231 - 1
"""
class Solution:
  def isHappy(self, n: int) -> bool:
    if n == 1:
      return True

    #an unhappy number will be stuck in a one-less loop (like a linked list loop)
    #so we'll use set to detect the start of the loop (you can also use fast and slow pointer)
    previouslyVisitedNumber = set()
    while True:
      previouslyVisitedNumber.add(n)
      n = self.calculateSumOfSquaresOfDigits(n)
      if n == 1:
        return True
      if n in previouslyVisitedNumber:
        return False
  
  def calculateSumOfSquaresOfDigits(self, n: int) -> int:
    total = 0
    while n > 0:
      lastDigit = n % 10
      total += lastDigit * lastDigit
      n //= 10 #remove/pop last digit
    return total