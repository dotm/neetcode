function search(nums: number[], target: number): number {
  if(nums.length === 0){
      return -1
  }

  let leftIndex = 0
  let rightIndex = nums.length-1
  let targetIndex = Math.floor((leftIndex+rightIndex)/2)

  while(leftIndex <= rightIndex){
      if(nums[targetIndex] > target){
          rightIndex = targetIndex - 1
          targetIndex = Math.floor((leftIndex+rightIndex)/2)
      }else if(nums[targetIndex] < target){
          leftIndex = targetIndex + 1
          targetIndex = Math.floor((leftIndex+rightIndex)/2)
      }else{
          //found match because nums[targetIndex] === target
          return targetIndex
      }
  }
  return -1
};