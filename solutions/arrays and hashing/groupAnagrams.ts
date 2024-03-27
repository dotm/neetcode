/*
49. Group Anagrams
Medium

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Example 2:

Input: strs = [""]
Output: [[""]]
Example 3:

Input: strs = ["a"]
Output: [["a"]]
 

Constraints:

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.
*/
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
      stringsMap.set(key, val)
  }
  return Array.from(stringsMap.values())
};

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))