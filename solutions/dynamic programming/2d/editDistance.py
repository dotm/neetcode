"""
72. Edit Distance
Solved
Medium
Topics
Companies
Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

Insert a character
Delete a character
Replace a character
 

Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
 

Constraints:

0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.
"""
class Solution:
  def minDistance(self, word1: str, word2: str) -> int:
    matrix = [ [float("inf")]*(len(word2)+1) for i in range(len(word1)+1) ]
    #matrix row is chars of word1, col is chars of word2, cell value is operations required to convert word1 to word2 if we choose to use this path

    for j in range(len(word2)+1):
      #the bottom row is empty string and the min operation required to change
      #an empty string to another string (substring of word2)
      #is the length of that other string
      matrix[len(word1)][j] = len(word2) - j
    for i in range(len(word1)+1):
      #the rightmost column is empty string and the min operation required to change
      #an empty string to another string (substring of word1)
      #is the length of that other string
      matrix[i][len(word2)] = len(word1) - i
    
    #work backward (bottom up) from the bottom right of the matrix
    for i in range(len(word1)-1, -1, -1):
      for j in range(len(word2)-1, -1, -1):
        if word1[i] == word2[j]:
          #char matched: step 1 next char from both word1 and word2
          matrix[i][j] = matrix[i+1][j+1]
        else:
          #1 operation required if char not matched
          matrix[i][j] = 1 + min(
            matrix[i+1][j],   #delete operation: step 1 next char only from word1
            matrix[i][j+1],   #insert operation: step 1 next char only from word2
            matrix[i+1][j+1], #replace operation: step 1 next char from word1 and word2
          )
    return matrix[0][0]