function longestCommonSubsequence(text1: string, text2: string): number {
  let countArr = Array(text2.length).fill(0)
  for(let rowCharIndex=text1.length-1;rowCharIndex>=0;rowCharIndex--){
      let countArrOnTop = Array(text2.length).fill(0)
      for(let colCharIndex=text2.length-1;colCharIndex>=0;colCharIndex--){
          if(text1[rowCharIndex]===text2[colCharIndex]){
              countArrOnTop[colCharIndex] =
                  (countArr[colCharIndex+1] ?? 0)
                  //get value from the diagonal right-bottom
                  + 1
          }else{
              countArrOnTop[colCharIndex] =
                  Math.max(
                      (countArrOnTop[colCharIndex+1] ?? 0)
                      //get value from the right cell
                      ,
                      (countArr[colCharIndex] ?? 0)
                      //get value from the bottom cell
                  )
          }
      }
      countArr = countArrOnTop
  }
  return countArr[0]
};

console.log(longestCommonSubsequence("abcde","ace"))