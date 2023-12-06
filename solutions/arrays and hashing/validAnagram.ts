/*
242. Valid Anagram
Easy

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false

Constraints:
1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
*/
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
