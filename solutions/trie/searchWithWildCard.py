"""
211. Design Add and Search Words Data Structure
Medium
7.3K
423
Companies
Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
 

Example:

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
 

Constraints:

1 <= word.length <= 25
word in addWord consists of lowercase English letters.
word in search consist of '.' or lowercase English letters.
There will be at most 2 dots in word for search queries.
At most 104 calls will be made to addWord and search.
"""

class TrieNode:
  def __init__(self):
    self.children = {} #{char: TrieNode}
    self.isWord = False #sentinel to check the current Node is a single, full word

class WordDictionary:
  def __init__(self):
    self.root = TrieNode()

  def addWord(self, word: str) -> None:
    currentTrieNode = self.root
    for char in word:
      if char not in currentTrieNode.children:
        currentTrieNode.children[char] = TrieNode() #init if not init-ed yet
      currentTrieNode = currentTrieNode.children[char] #move to the child node
    currentTrieNode.isWord = True

  def search(self, word: str) -> bool:
    def dfs(startIndexOfWordSubstring: int, root: TrieNode):
      currentTrieNode = root
      for i in range(startIndexOfWordSubstring, len(word)):
        char = word[i]
        if char == ".":
          #if wildcard, search all children
          for child in currentTrieNode.children.values():
            if dfs(i+1, child): #if there's one child who fulfill the search
              return True
          return False
        else:
          if char not in currentTrieNode.children:
            return False
          currentTrieNode = currentTrieNode.children[char]
      return currentTrieNode.isWord
    return dfs(0, self.root)

# Your WordDictionary object will be instantiated and called as such:
# obj = WordDictionary()
# obj.addWord(word)
# param_2 = obj.search(word)