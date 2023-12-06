/*
973. K Closest Points to Origin
Medium
8.1K
286
Companies
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

 

Example 1:


Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.
 

Constraints:

1 <= k <= points.length <= 104
-104 <= xi, yi <= 104
*/
function kClosest(points: number[][], k: number): number[][] {
  const minHeap = new MinHeap<number[]>({
    entries: points,
    setPriority: function(entry: number[]): number {
      //x^2 + y^2
      //we don't need to do square root
      //because we are only comparing the distance to origin
      //and not calculating the exact distance
      return (entry[0] * entry[0]) + (entry[1] * entry[1])
    }})
  const result: number[][] = []
  for (let i = 0; i < k; i++) {
    result.push(minHeap.pop())
  }
  return result
};

class MinHeap<T> {
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

	// Functions to create Min Heap
	#swap(indexOne: number, indexTwo: number) {
		[this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]];
	}
	#heapifyUp() {
		let index = this.heap.length - 1;
		while (this.#hasParent(index) && this.#parent(index).priority > this.heap[index].priority) {
			this.#swap(this.#getParentIndex(index), index);
			index = this.#getParentIndex(index);
		}
	}
	#heapifyDown() {
		let index = 0;
		while (this.#hasLeftChild(index)) {
			let smallerChildIndex = this.#getLeftChildIndex(index);
			if (this.#hasRightChild(index) && this.#rightChild(index).priority < this.#leftChild(index).priority) {
				smallerChildIndex = this.#getRightChildIndex(index);
			}
			if (this.heap[index].priority < this.heap[smallerChildIndex].priority) {
				break;
			} else {
				this.#swap(index, smallerChildIndex);
			}
			index = smallerChildIndex;
		}
	}
}