/*
208. Implement Trie (Prefix Tree)
Medium
11.1K
123
Companies
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 

Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
 

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, search, and startsWith.
*/
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