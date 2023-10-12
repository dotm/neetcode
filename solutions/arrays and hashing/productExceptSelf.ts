function productExceptSelf(nums: number[]): number[] {
  let leftArr: number[] = []
  let rightArr: number[] = []
  for(let i=nums.length-1;i>=0;i--){
    if(i===nums.length-1){
      rightArr[i]=1
      continue
    }
    rightArr[i] = rightArr[i+1] * nums[i+1]
  }
  for(let i=0;i<nums.length;i++){
      if(i===0){
          leftArr[i]=1
          continue
      }
      leftArr[i] = leftArr[i-1] * nums[i-1]
    }
  
    let out: number[] = []
    for(let i=0;i<nums.length;i++){
      out[i] = leftArr[i] * rightArr[i]
    }
    return out
};


console.log(productExceptSelf([1,2,3,4]))