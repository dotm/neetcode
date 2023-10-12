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