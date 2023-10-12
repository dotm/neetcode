function lengthOfLongestSubstring(s: string): number {
  let leftPointer = 0
  let rightPointer = 0
  const charSet = new Set<string>()
  let longestSubstring = 0
  while(rightPointer<s.length){
    if(charSet.has(s[rightPointer])){
      charSet.delete(s[leftPointer])
      leftPointer++
      continue
    }
    charSet.add(s[rightPointer])
    rightPointer++
    longestSubstring = Math.max(longestSubstring,rightPointer-leftPointer)
  }
  return longestSubstring
};