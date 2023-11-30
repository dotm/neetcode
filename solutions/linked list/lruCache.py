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
    if key in self.cache:
      node = self.cache[key]
      self.removeFromLinkedList(node)
      self.putAsMostRecentlyUsed(node)
      return node.val
    return -1

  def put(self, key: int, value: int) -> None:
    if key in self.cache:
      node = self.cache[key]
      self.removeFromLinkedList(node)
    self.cache[key] = Node(key, value)
    node = self.cache[key]
    self.putAsMostRecentlyUsed(node)
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