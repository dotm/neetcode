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