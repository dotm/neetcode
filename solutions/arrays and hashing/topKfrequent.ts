function topKFrequent(nums: number[], k: number): number[] {
  const countMap = new Map<number, number>()
  for(let i=0;i<nums.length;i++){
      countMap.set(nums[i],(countMap.get(nums[i]) ?? 0) + 1)
  }
  let arr: number[][] = []
  for(let [num, count] of countMap){
      let numArr = (arr[count] ?? [])
      numArr.push(num)
      arr[count] = numArr
  }
  let topK: number[] = []
  for(let i=arr.length-1;i>=0;i--){
      if(arr[i] && arr[i].length > 0){
          topK.push(...arr[i])
      }
      if(topK.length >= k){
          return topK
      }
  }
  return topK
};

console.log(topKFrequent([1,1,1,2,2,3],2))