//Given a non-empty array of integers nums,
//every element appears twice except for one.
//Find that single one.
function singleNumber(nums: number[]): number {
    let result = 0
    for(let i=0; i<nums.length; i++){
        result ^= nums[i]
    }
    return result
};