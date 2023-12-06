/*
22. Generate Parentheses
Medium
20.1K
844
Companies
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 

Constraints:

1 <= n <= 8
*/
function generate#parenthesis(n: number): string[] {
  const result: string[] = []

  function recurseGenerate(currentString: string, openCount: number, closeCount: number){
    if(openCount < n){
      recurseGenerate(currentString + "(", openCount + 1, closeCount)
    }
    if(closeCount < openCount){
      recurseGenerate(currentString + ")", openCount, closeCount + 1)
    }
    if(closeCount + openCount === n + n){
      result.push(currentString)
    }
  }

  recurseGenerate("", 0, 0)
  return result
};