function countBits(n: number): number[] {
    let bitCountList = [0]
    let offset = 1
    for(let i=1;i<=n;i++){
        if(i === offset * 2){
            offset = i
        }
        bitCountList[i] = 1+bitCountList[i-offset] //use dynamic programming (previously computed results)
    }
    return bitCountList
};