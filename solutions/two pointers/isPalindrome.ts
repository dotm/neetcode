/*
125. Valid Palindrome
Easy
8.6K
8.1K
Companies
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

 

Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
 

Constraints:

1 <= s.length <= 2 * 105
s consists only of printable ASCII characters.
*/
function isPalindrome(s: string): boolean {
  let i = 0
  let j = s.length - 1

  while(true){
      let charCodeI = s.charCodeAt(i)
      let charCodeJ = s.charCodeAt(j)
      
      //lowercase
      if(charCodeI >= 65 /*A*/ && charCodeI <= 90 /*Z*/){
          charCodeI += 32 //lowercase
      }
      if(charCodeJ >= 65 /*A*/ && charCodeJ <= 90 /*Z*/){
          charCodeJ += 32 //lowercase
      }

      //skip non-alphanumeric
      if(
          !(charCodeI >= 48 /*0*/ && charCodeI <= 57 /*9*/)
          && !(charCodeI >= 97 /*a*/ && charCodeI <= 122 /*z*/)
      ){
          i++
          if(i>=j){ //already traverse half of the string
            return true
          }
          continue
      }
      if(
          !(charCodeJ >= 48 /*0*/ && charCodeJ <= 57 /*9*/)
          && !(charCodeJ >= 97 /*a*/ && charCodeJ <= 122 /*z*/)
      ){
          j--
          if(i>=j){ //already traverse half of the string
            return true
          }
          continue
      }

      if(charCodeI !== charCodeJ){
        return false
      }

      i++
      j--
      if(i>=j){ //already traverse half of the string
        return true
      }
  }
};