function subsets(nums: number[]): number[][] {
    let subsets: number[][] = []
    for(let i=0;i<nums.length;i++){
        let nextSubsets: number[][] = []
        if(subsets.length === 0){
            subsets = [[], [nums[i]]]
            continue
        }
        for(let j=0;j<subsets.length;j++){
            //add nums[i]
            if(subsets[j].length === 0){
                nextSubsets.push([nums[i]])
            }else{
                nextSubsets.push([...subsets[j], nums[i]])
            }

            //don't add nums[i]
            nextSubsets.push(subsets[j])
        }
        subsets = nextSubsets
    }
    return subsets
};