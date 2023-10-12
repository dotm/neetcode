function hammingWeight(n: number): number {
    let countOfOneBits = 0
    while(n>0){
        if(n%2 === 1){
            countOfOneBits++
        }
        n >>>= 1
    }
    return countOfOneBits
};
