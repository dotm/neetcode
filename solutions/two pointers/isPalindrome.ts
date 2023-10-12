function isPalindrome(s: string): boolean {
  let i = 0
  let j = s.length - 1

  while(true){
      let charCodeI = s.charCodeAt(i)
      let charCodeJ = s.charCodeAt(j)
      
      //lowercase
      if(charCodeI >= 65 /*A*/ && charCodeI <= 90 /*Z*/){
          charCodeI += 32 //lowercase
      }
      if(charCodeJ >= 65 /*A*/ && charCodeJ <= 90 /*Z*/){
          charCodeJ += 32 //lowercase
      }

      //skip non-alphanumeric
      if(
          !(charCodeI >= 48 /*0*/ && charCodeI <= 57 /*9*/)
          && !(charCodeI >= 97 /*a*/ && charCodeI <= 122 /*z*/)
      ){
          i++
          if(i>=j){ //already traverse half of the string
            return true
          }
          continue
      }
      if(
          !(charCodeJ >= 48 /*0*/ && charCodeJ <= 57 /*9*/)
          && !(charCodeJ >= 97 /*a*/ && charCodeJ <= 122 /*z*/)
      ){
          j--
          if(i>=j){ //already traverse half of the string
            return true
          }
          continue
      }

      if(charCodeI !== charCodeJ){
        return false
      }

      i++
      j--
      if(i>=j){ //already traverse half of the string
        return true
      }
  }
};