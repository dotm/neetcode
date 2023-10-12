function climbStairs(n: number): number {
  let solutionForRightElement = 1 //initialize for the n-th step
  let solutionForLeftElement = 1 //initialize for n-1 step of which there's only 1 solution (take 1 step)
  let tmp = 0
  for(
      let i=n-2; //because 2 of the solutions has been initialized above
      i>=0;
      i--
  ){
      //shift to the left
      tmp = solutionForLeftElement + solutionForRightElement
      solutionForRightElement = solutionForLeftElement
      solutionForLeftElement = tmp
  }
  return solutionForLeftElement
};