/*
Permutation but limiting the number of sample taken (not all nums are returned)
*/
function permute(nums: number[], sampleCount: number | undefined = undefined): number[][] {
  const permutationList: number[][] = []
  if(sampleCount === undefined){
    sampleCount = nums.length
  }
  
  function dfsRecurse(currentNums: number[], selectedNums: number[]){
    if(selectedNums.length >= sampleCount!){
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

console.log(permute([1,2,3,4,5], 2))