"""
7. Reverse Integer
Medium
12.3K
13.3K
Companies
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 

Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21
 

Constraints:

-2^31 <= x <= 2^31 - 1
"""
import math as math
class Solution:
  def reverse(self, x: int) -> int:
    MIN = -2147483648  # -2^31
    MAX = 2147483647  #  2^31 - 1

    result = 0 #reversed digit
    while x != 0:
      #use math.fmod in Python because using % can cause: -1 % 10 = 9
      #we want -1 mod by 10 to be -1
      digit = int(math.fmod(x,10))
      
      #use float division in Python because: -1 // 10 = -1
      #we want -1 / 10 = 0 (rounded toward zero)
      x = int(x / 10)

      resultWithoutLastDigitIsAlreadyAboveMax = result > MAX // 10
      resultWithLastDigitIsAboveMax = result == MAX // 10 and digit > MAX % 10
      resultIsAboveMax = resultWithoutLastDigitIsAlreadyAboveMax or resultWithLastDigitIsAboveMax
      resultWithoutLastDigitIsAlreadyBelowMin = result < MIN // 10
      resultWithLastDigitIsBelowMin = result == MIN // 10 and digit < MIN % 10
      resultIsBelowMin = resultWithoutLastDigitIsAlreadyBelowMin or resultWithLastDigitIsBelowMin

      if resultIsAboveMax or resultIsBelowMin:
        return 0
      result = (result * 10) + digit #add to the reversed digit
    return result