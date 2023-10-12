function evalRPN(tokens: string[]): number {
  const stack: number[] = []
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if(token === "+"){
      const rightVal = stack.pop()
      const leftVal = stack.pop()
      stack.push(leftVal+rightVal)
    }else if(token === "-"){
      const rightVal = stack.pop()
      const leftVal = stack.pop()
      stack.push(leftVal-rightVal)
    }else if(token === "*"){
      const rightVal = stack.pop()
      const leftVal = stack.pop()
      stack.push(leftVal*rightVal)
    }else if(token === "/"){
      const rightVal = stack.pop()
      const leftVal = stack.pop()
      const val = leftVal/rightVal
      const roundedVal = val > 0 ? Math.floor(val) : Math.ceil(val)
      stack.push(roundedVal)
    }else{
      stack.push(parseInt(token))
    }
  }
  return stack[0]
};

evalRPN(["4","13","5","/","+"])