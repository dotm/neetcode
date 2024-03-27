/*
22. Generate Parentheses
Medium

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
function generateParenthesis(n: number): string[] {
  const result: string[] = []

  function recurseGenerate(currentString: string, openCount: number, closeCount: number){
    if(openCount < n){ //can add open parenthesis anytime up to n
      recurseGenerate(currentString + "(", openCount + 1, closeCount)
    }
    if(closeCount < openCount){ //can only add closed parenthesis if there're unclosed parentheses
      recurseGenerate(currentString + ")", openCount, closeCount + 1)
    }
    if(closeCount + openCount === n + n){
      result.push(currentString)
    }
  }

  recurseGenerate("", 0, 0)
  return result
};