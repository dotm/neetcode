function permute(nums: number[]): number[][] {
  const permutationList: number[][] = []
  
  function dfsRecurse(currentNums: number[], selectedNums: number[]){
    if(selectedNums.length >= nums.length){
      permutationList.push(selectedNums)
      return
    }
    for(let i=0;i<currentNums.length;i++){
      const clonedNums = [...currentNums]
      const [selectedNum] = clonedNums.splice(i,1)
      dfsRecurse(clonedNums, [...selectedNums, selectedNum])
    }
  }
  dfsRecurse(nums,[])
  return permutationList
};