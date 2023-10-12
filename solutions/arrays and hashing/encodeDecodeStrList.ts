function encodeStrings(strArr: string[]): string {
  //with header for word count
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