function groupAnagramsWithSorting(strs: string[]): string[][] {
  const map = new Map<string, string[]>()

  for(let i=0; i<strs.length; i++){
      const str = strs[i]
      const key = str.split('').sort().join('')
      const val = map.get(key) ?? []
      val.push(str)
      map.set(key, val)
  }

  return Array.from(map.values())
};

function groupAnagrams(strs: string[]): string[][] {
  const charCodeOfLowercaseA = 97
  const stringsMap = new Map<string, string[]>()
  for(let i=0; i<strs.length; i++){
      const str = strs[i]
      const charArr: number[] = []
      for(let j=0; j<str.length; j++){
          const val = charArr[str.charCodeAt(j)-charCodeOfLowercaseA] ?? 0
          charArr[str.charCodeAt(j)-charCodeOfLowercaseA] = val + 1
      }
      let key = ""
      for (let k = 0; k < charArr.length; k++) {
        if(charArr[k]){
          key += `${k},${charArr[k]}|`
        }
      }

      let val = stringsMap.get(key) ?? []
      val.push(str)
      console.log(key)
      stringsMap.set(key, val)
  }
  return Array.from(stringsMap.values())
};

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))