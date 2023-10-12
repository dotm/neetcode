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