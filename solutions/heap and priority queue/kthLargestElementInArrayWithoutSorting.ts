function findKthLargest(nums: number[], k: number): number {
  const maxHeap = new MaxHeap(nums)
  let result = 0
  while(k>0){
    result = maxHeap.pop()
    k--
  }
  return result
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
