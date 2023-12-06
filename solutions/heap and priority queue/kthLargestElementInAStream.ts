/*
703. Kth Largest Element in a Stream
Easy
5.2K
3.2K
Companies
Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement KthLargest class:

KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.
 

Example 1:

Input
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output
[null, 4, 5, 5, 8, 8]

Explanation
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8
 

Constraints:

1 <= k <= 104
0 <= nums.length <= 104
-104 <= nums[i] <= 104
-104 <= val <= 104
At most 104 calls will be made to add.
It is guaranteed that there will be at least k elements in the array when you search for the kth element.
*/
class KthLargest {
  minHeap: MinHeap
  k: number
  constructor(k: number, nums: number[]) {
    this.minHeap = new MinHeap()
    this.k = k
    for(let i=0;i<nums.length;i++){
      this.minHeap.add(nums[i])
    }
    while(this.minHeap.heap.length > this.k){
      this.minHeap.pop()
    }
  }

  add(val: number): number {
    this.minHeap.add(val)
    while(this.minHeap.heap.length > this.k){
      this.minHeap.pop()
    }
    return this.minHeap.peek()!
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

class MinHeap {
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

	// Functions to create Min Heap
	#swap(indexOne: number, indexTwo: number) {
		[this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]];
	}
	#heapifyUp() {
		let index = this.heap.length - 1;
		while (this.#hasParent(index) && this.#parent(index) > this.heap[index]) {
			this.#swap(this.#getParentIndex(index), index);
			index = this.#getParentIndex(index);
		}
	}
	#heapifyDown() {
		let index = 0;
		while (this.#hasLeftChild(index)) {
			let smallerChildIndex = this.#getLeftChildIndex(index);
			if (this.#hasRightChild(index) && this.#rightChild(index) < this.#leftChild(index)) {
				smallerChildIndex = this.#getRightChildIndex(index);
			}
			if (this.heap[index] < this.heap[smallerChildIndex]) {
				break;
			} else {
				this.#swap(index, smallerChildIndex);
			}
			index = smallerChildIndex;
		}
	}
}
