"""
146. LRU Cache
Medium
19.7K
908
Companies
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.

 

Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
 

Constraints:

1 <= capacity <= 3000
0 <= key <= 104
0 <= value <= 105
At most 2 * 105 calls will be made to get and put.
"""
class Node:
  def __init__(self, key, val):
    self.key = key
    self.val = val
    self.prev = None
    self.next = None

class LRUCache:
  def __init__(self, capacity: int):
    self.capacity = capacity
    self.cache = {} #to access node by key
    
    #create sentinel nodes as pointers to access the:
    self.left = Node(-1, -1) #least recently used node
    self.right = Node(-1, -1) #most recently used node
    #create doubly linked list
    self.left.next = self.right
    self.right.prev = self.left

  def get(self, key: int) -> int:
    #move existing key to most recently used
    if key in self.cache:
      node = self.cache[key]
      self.removeFromLinkedList(node)
      self.putAsMostRecentlyUsed(node)
      return node.val
    return -1

  def put(self, key: int, value: int) -> None:
    #move existing key to most recently used
    if key in self.cache:
      node = self.cache[key]
      self.removeFromLinkedList(node)
    self.cache[key] = Node(key, value)
    node = self.cache[key]
    self.putAsMostRecentlyUsed(node)

    #trim the LRU cache to keep within capacity
    if len(self.cache) > self.capacity:
      leastRecentlyUsedNode = self.left.next
      self.removeFromLinkedList(leastRecentlyUsedNode)
      del self.cache[leastRecentlyUsedNode.key]
  
  def removeFromLinkedList(self, node):
    node.prev.next, node.next.prev = node.next, node.prev
  
  def putAsMostRecentlyUsed(self, node):
    node.prev = self.right.prev
    node.next = self.right
    self.right.prev.next = node
    self.right.prev = node


# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)