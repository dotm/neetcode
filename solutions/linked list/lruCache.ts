/*
146. LRU Cache
Medium

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
*/

class LinkedListNode {
  key: number
  val: number
  prev: LinkedListNode | null
  next: LinkedListNode | null
  constructor(key: number, val?: number, prev?: LinkedListNode | null, next?: LinkedListNode | null) {
    this.key = key
    this.val = val ?? 0
    this.prev = prev ?? null
    this.next = next ?? null
  }
}

class LRUCache {
  capacity: number
  cache: Map<number, LinkedListNode>
  left: LinkedListNode
  right: LinkedListNode
  constructor(capacity: number) {
    this.capacity = capacity
    this.cache = new Map() //to access node by key

    //create sentinel nodes as pointers to access the:
    this.left = new LinkedListNode(-1, -1) //least recently used node
    this.right = new LinkedListNode(-1, -1) //most recently used node
    //create doubly linked list
    this.left.next = this.right
    this.right.prev = this.left
  }

  get(key: number): number {
    //move existing key to most recently used
    const node = this.cache.get(key)
    if(node === undefined){
      return -1
    }

    this.removeFromLinkedList(node)
    this.putAsMostRecentlyUsed(node)
    return node.val
  }

  put(key: number, value: number): void {
    //move existing key to most recently used
    let node = this.cache.get(key)
    if(node !== undefined){
      this.removeFromLinkedList(node)
    }
    node = new LinkedListNode(key, value)
    this.cache.set(key, node) //upsert with new value
    this.putAsMostRecentlyUsed(node)

    //trim the LRU cache to keep within capacity
    if(this.cache.size > this.capacity){
      const leastRecentlyUsedNode = this.left.next
      if(leastRecentlyUsedNode){
        this.removeFromLinkedList(leastRecentlyUsedNode)
        this.cache.delete(leastRecentlyUsedNode.key)
      }
    }
  }
  
  removeFromLinkedList(node: LinkedListNode): void {
    if(node.prev){
      node.prev.next = node.next
    }
    if(node.next){
      node.next.prev = node.prev
    }
  }
  
  putAsMostRecentlyUsed(node: LinkedListNode): void {
    //set pointer of current node
    node.prev = this.right.prev
    node.next = this.right
    //set pointer of previous most recently used node (that's being replaced by current node)
    if(this.right.prev){
      this.right.prev.next = node
    }
    //set pointer of sentinel node
    this.right.prev = node
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const lRUCache = new LRUCache(2)
lRUCache.put(2, 1);
