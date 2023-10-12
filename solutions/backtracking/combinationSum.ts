function combinationSum(candidates: number[], target: number): number[][] {
  let combinationResult: number[][] = []

  function dfsRecurse(
    combination: number[],
    candidateIndex: number,
    target: number,
    total: number,
  ){
    if(candidateIndex >= candidates.length){
      return
    }
    if(total > target){
      return
    }
    if(total === target){
      combinationResult.push(combination)
      return
    }

    //add more of the same candidate
    dfsRecurse(
      [...combination, candidates[candidateIndex]],
      candidateIndex,
      target,
      total+candidates[candidateIndex],
    )
    //move on to the next candidate
    dfsRecurse(
      combination,
      candidateIndex+1,
      target,
      total,
    )
  }
  dfsRecurse([],0,target,0)

  return combinationResult
};