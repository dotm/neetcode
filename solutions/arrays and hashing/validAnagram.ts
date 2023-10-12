function isAnagram(s: string, t: string): boolean {
  if(s.length !== t.length){
      return false
  }

  const countMap = new Map<string,number>()
  for(let i = 0; i < s.length; i++){
      countMap.set(s[i], (countMap.get(s[i]) ?? 0) + 1)
  }
  for(let i=0; i<t.length; i++){
      let count = countMap.get(t[i])
      if(count === undefined){
          return false
      }
      countMap.set(t[i],count-1)
  }
  for(let [key, value] of countMap){
      if(value !== 0){
          return false
      }
  }
  return true
};
