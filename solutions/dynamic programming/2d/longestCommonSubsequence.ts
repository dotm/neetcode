/*
1143. Longest Common Subsequence
Medium
12.5K
160
Companies
Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

 

Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 

Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.
*/
function longestCommonSubsequence(text1: string, text2: string): number {
  let countArr = Array(text2.length).fill(0)
  for(let rowCharIndex=text1.length-1;rowCharIndex>=0;rowCharIndex--){
      let countArrOnTop = Array(text2.length).fill(0)
      for(let colCharIndex=text2.length-1;colCharIndex>=0;colCharIndex--){
          if(text1[rowCharIndex]===text2[colCharIndex]){
              countArrOnTop[colCharIndex] =
                  (countArr[colCharIndex+1] ?? 0)
                  //get value from the diagonal right-bottom
                  + 1
          }else{
              countArrOnTop[colCharIndex] =
                  Math.max(
                      (countArrOnTop[colCharIndex+1] ?? 0)
                      //get value from the right cell
                      ,
                      (countArr[colCharIndex] ?? 0)
                      //get value from the bottom cell
                  )
          }
      }
      countArr = countArrOnTop
  }
  return countArr[0]
};

console.log(longestCommonSubsequence("abcde","ace"))