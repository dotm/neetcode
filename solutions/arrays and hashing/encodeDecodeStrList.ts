/*
659 · Encode and Decode Strings
Algorithms
Medium

Description
Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Please implement encode and decode

Because the string may contain any of the 256 legal ASCII characters, your algorithm must be able to handle any character that may appear

Do not rely on any libraries, the purpose of this problem is to implement the "encode" and "decode" algorithms on your own

Example
Example1

Input: ["lint","code","love","you"]
Output: ["lint","code","love","you"]
Explanation:
One possible encode method is: "lint:;code:;love:;you"
Example2

Input: ["we", "say", ":", "yes"]
Output: ["we", "say", ":", "yes"]
Explanation:
One possible encode method is: "we:;say:;:::;yes"
*/
function encodeStrings(strArr: string[]): string {
  //encoded format: header#words
  //header format is | separated word's length
  let wordsLength: number[] = []
  for (let i = 0; i < strArr.length; i++) {
    const str = strArr[i];
    wordsLength.push(str.length)
  }
  const header = wordsLength.join("|")
  return header + "#" + strArr.join("")
}
function decodeStrings(encodedStr: string): string[] {
  let strArr: string[] = []
  let wordsLength: number[] = encodedStr.split("#")[0].split("|").map(s=>parseInt(s))
  let i = encodedStr.indexOf("#") + 1
  while (i < encodedStr.length) {
    const char = encodedStr[i];
    
    //recreate strArr
    let charCount = wordsLength.shift()
    if(charCount === undefined){
      break
    }
    strArr.push(encodedStr.substring(i,i+charCount))
    i += charCount
  }
  return strArr
}

const original = [
  "`~12345678",
  "90[]!@#$%^&*",
  "(){}',.pyfgc",
  "rl/=\\\"<>PYF",
  "GCRL?+|aoe",
  "uidhtns-AOEU",
  "IDHTNS_;qjkxbm",
  "wvz:QJKXBMWVZ"
]
const encoded = encodeStrings(original)
const decoded = decodeStrings(encoded)
//should be the same
console.log(original)
console.log(decoded)

console.log(encoded)
console.log(JSON.stringify(original)===JSON.stringify(decoded))