/*
347. Top K Frequent Elements
Medium
16.4K
597
Companies
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

 

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.
 

Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
*/
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