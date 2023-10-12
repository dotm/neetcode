class TrieNode {
  _children = new Map<string,TrieNode>()
  _endOfWord = false

  addNewChar(char: string, endOfWord: boolean): TrieNode {
    let existing = this._children.get(char)
    if(existing === undefined){
      const newNode = new TrieNode()
      this._children.set(char, newNode)
      existing = newNode
    }
    if(endOfWord){
      existing._endOfWord = true
    }
    return existing
  }

  getChar(char: string): TrieNode | undefined {
    return this._children.get(char)
  }
}

class Trie {
  _root = new TrieNode()
  constructor() {
  }

  insert(word: string): void {
    let curr = this._root
    for(let i=0;i<word.length;i++){
      curr = curr.addNewChar(word[i], (i+1) === word.length)
    }
  }

  search(word: string): boolean {
    let curr: TrieNode | undefined = this._root
    for(let i=0;i<word.length;i++){
      curr = curr.getChar(word[i])
      if(curr === undefined){
        return false
      }
    }
    return curr._endOfWord
  }

  startsWith(prefix: string): boolean {
    let curr: TrieNode | undefined = this._root
    for(let i=0;i<prefix.length;i++){
      curr = curr.getChar(prefix[i])
      if(curr === undefined){
        return false
      }
    }
    return true
  }
}

/**
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/