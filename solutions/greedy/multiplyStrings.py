"""
43. Multiply Strings
Medium
6.8K
3.2K
Companies
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

 

Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"
Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"
 

Constraints:

1 <= num1.length, num2.length <= 200
num1 and num2 consist of digits only.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.
"""
class Solution:
  def multiply(self, num1: str, num2: str) -> str:
    if num1 == "0" or num2 == "0":
      return "0"
    
    maxLength = (len(num1)+len(num2)) #max length of num1*num2
    res = [0] * maxLength

    #reverse the array because we'll process them from the smaller end
    num1 = num1[::-1]
    num2 = num2[::-1]
    for i1 in range(len(num1)):
      for i2 in range(len(num2)):
        digit = int(num1[i1]) * int(num2[i2])
        
        #use += because the index may already have a carry
        res[i1+i2] += digit
        res[i1+i2+1] += res[i1+i2] // 10
        
        res[i1+i2] = res[i1+i2] % 10
    
    res = res[::-1] #reverse back to big endian (normal human representation of number)
    
    #trim leading zeros (e.g. 00003234)
    i = 0
    while i<len(res) and res[i]==0:
      i += 1
    res = res[i:]

    #convert result from number back into string
    res = "".join(map(str,res))
    return res