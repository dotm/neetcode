/*
1046. Last Stone Weight
Easy
5.7K
97
Companies
You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

If x == y, both stones are destroyed, and
If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
At the end of the game, there is at most one stone left.

Return the weight of the last remaining stone. If there are no stones left, return 0.

 

Example 1:

Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.
Example 2:

Input: stones = [1]
Output: 1
 

Constraints:

1 <= stones.length <= 30
1 <= stones[i] <= 1000
*/
function lastStoneWeight(stones: number[]): number {
  let maxHeap = new MaxHeap(stones)
  while(maxHeap.getSize() >= 2){
    const a = maxHeap.pop()
    const b = maxHeap.pop()
    //a is always greater than b
    if(a !== b){
      //if the two stones doesn't get destroyed because they're of the same weight
      //add the result back to the heap
      maxHeap.add(a-b)
    }
  }

  return maxHeap.getSize() > 0 ? maxHeap.pop() : 0
};

class MaxHeap {
  heap: number[]
  constructor(entries: number[] | undefined = undefined) {
    this.heap = [];
    if(entries !== undefined){
      for (let i = 0; i < entries.length; i++) {
        this.add(entries[i]);
      }
    }
  }
  
  /* Public Methods */
  
  getSize(): number {
		return this.heap.length
	}
  
  // Popping an element will pop the
  // top element with highest priority then
  // #heapifyDown will be called
  pop(): number | null {
    if (this.heap.length === 0) {
      return null;
    }
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.#heapifyDown();
    return item;
  }
  
  add(item: number) {
    this.heap.push(item);
    this.#heapifyUp();
  }
  
  peek(): number | null {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }
  
  printHeap() {
    var heap =` ${this.heap[0]} `
    for(var i = 1; i<this.heap.length;i++) {
      heap += ` ${this.heap[i]} `;
    }
    console.log(heap);
  }

  /* Private Helper Methods */
  #getLeftChildIndex(parentIndex: number): number { return 2 * parentIndex + 1; }
  #getRightChildIndex(parentIndex: number): number { return 2 * parentIndex + 2; }
  #getParentIndex(childIndex: number): number { return Math.floor((childIndex - 1) / 2); }
  #hasLeftChild(index: number): boolean { return this.#getLeftChildIndex(index) < this.heap.length; }
  #hasRightChild(index: number): boolean { return this.#getRightChildIndex(index) < this.heap.length; }
  #hasParent(index: number): boolean { return this.#getParentIndex(index) >= 0; }
  #leftChild(index: number): number { return this.heap[this.#getLeftChildIndex(index)]; }
  #rightChild(index: number): number { return this.heap[this.#getRightChildIndex(index)]; }
  #parent(index: number): number { return this.heap[this.#getParentIndex(index)]; }

  // Functions to create Max Heap
  #swap(indexOne: number, indexTwo: number) {
		[this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]];
	}
  #heapifyUp() {
    let index = this.heap.length - 1;
    while (this.#hasParent(index) && this.#parent(index) < this.heap[index]) {
      this.#swap(this.#getParentIndex(index), index);
      index = this.#getParentIndex(index);
    }
  }
  #heapifyDown() {
    let index = 0;
    while (this.#hasLeftChild(index)) {
      let largerChildIndex = this.#getLeftChildIndex(index);
      if (this.#hasRightChild(index) && this.#rightChild(index) > this.#leftChild(index)) {
        largerChildIndex = this.#getRightChildIndex(index);
      }
      if (this.heap[index] > this.heap[largerChildIndex]) {
        break;
      } else {
        this.#swap(index, largerChildIndex);
      }
      index = largerChildIndex;
    }
  }
}