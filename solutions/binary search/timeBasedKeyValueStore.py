class TimeMap:

  def __init__(self):
    self.keyStore = {}  # key : list of [val, timestamp]

  def set(self, key: str, value: str, timestamp: int) -> None:
    if key not in self.keyStore: self.keyStore[key] = []
    self.keyStore[key].append((value, timestamp))

  def get(self, key: str, timestamp: int) -> str:
    result = ""
    values = self.keyStore.get(key, [])
    #binary search
    leftPointer = 0
    rightPointer = len(values)-1
    while leftPointer <= rightPointer:
      midPointer = (leftPointer + rightPointer) // 2
      value = values[midPointer]
      if value[1] == timestamp:
        result = value[0]
        break
      elif value[1] < timestamp:
        result = value[0]
        leftPointer = midPointer + 1
      else:
        rightPointer = midPointer - 1
    return result

# Your TimeMap object will be instantiated and called as such:
# obj = TimeMap()
# obj.set(key,value,timestamp)
# param_2 = obj.get(key,timestamp)