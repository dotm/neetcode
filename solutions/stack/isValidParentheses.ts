/*
20. Valid Parentheses
Easy
22.8K
1.6K
Companies
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
*/
function isValid#parentheses(s: string): boolean {
  const stack: string[] = []
  for(let i=0;i<s.length;i++){
    const char = s[i]
    if ("({[".includes(char)){
      stack.push(char)
    }else if(char === ")"){
      const lastChar = stack.pop()
      if (lastChar !== "("){
        return false
      }
    }else if(char === "}"){
      const lastChar = stack.pop()
      if (lastChar !== "{"){
        return false
      }
    }else if(char === "]"){
      const lastChar = stack.pop()
      if (lastChar !== "["){
        return false
      }
    }
  }
  return stack.length === 0
};