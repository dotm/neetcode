from typing import List

class Solution:
  def plusOne(self, digits: List[int]) -> List[int]:
    output = []
    carry = 0
    for i in range(len(digits)-1, -1, -1):
      total = digits[i] + carry + (1 if i == len(digits) - 1 else 0)
      carry = total // 10
      output.insert(0, total % 10)
    if carry != 0:
      output.insert(0, carry)
    return output