function myPower(x: number, n: number): number {
  if(n===0){return 1}
  if(n<0){
    n = Math.abs(n)
    x = 1/x
  }
  if(n%2===0) {
    //x*x so that we can recurse once.
    // x^n = x^(n-2) * x^(n-2) = x^(2^(n-2)) = (x*x)^(n-2)
    //need to recurse only once so time limit is not exceeded.
    return myPower(x*x, n/2)
  } else {
    return x*myPower(x*x, (n-1)/2)
  }
};