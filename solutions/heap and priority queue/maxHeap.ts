class MaxHeap<T> {
  heap: {entry: T, priority: number}[]
	constructor(args: {entries: T[], setPriority: ((entry: T)=>number)} | undefined = undefined) {
    this.heap = [];
    if(args !== undefined){
      for (let i = 0; i < args.entries.length; i++) {
        this.add(args.entries[i], args.setPriority(args.entries[i]));
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
  pop(): T | null {
    if (this.heap.length === 0) {
      return null;
    }
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.#heapifyDown();
    return item.entry;
  }
  
  add(item: T, priority: number) {
		this.heap.push({entry: item, priority});
		this.#heapifyUp();
	}
  
  peek(): T | null {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0].entry;
  }
  
  printHeap() {
    var heap =` ${this.heap[0].entry} `
    for(var i = 1; i<this.heap.length;i++) {
      heap += ` ${this.heap[i].entry} `;
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
  #leftChild(index: number): {entry: T, priority: number} { return this.heap[this.#getLeftChildIndex(index)]; }
  #rightChild(index: number): {entry: T, priority: number} { return this.heap[this.#getRightChildIndex(index)]; }
  #parent(index: number): {entry: T, priority: number} { return this.heap[this.#getParentIndex(index)]; }

  // Functions to create Max Heap
  #swap(indexOne: number, indexTwo: number) {
		[this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]];
	}
  #heapifyUp() {
    let index = this.heap.length - 1;
    while (this.#hasParent(index) && this.#parent(index).priority < this.heap[index].priority) {
      this.#swap(this.#getParentIndex(index), index);
      index = this.#getParentIndex(index);
    }
  }
  #heapifyDown() {
    let index = 0;
    while (this.#hasLeftChild(index)) {
      let largerChildIndex = this.#getLeftChildIndex(index);
      if (this.#hasRightChild(index) && this.#rightChild(index).priority > this.#leftChild(index).priority) {
        largerChildIndex = this.#getRightChildIndex(index);
      }
      if (this.heap[index].priority > this.heap[largerChildIndex].priority) {
        break;
      } else {
        this.#swap(index, largerChildIndex);
      }
      index = largerChildIndex;
    }
  }
}
