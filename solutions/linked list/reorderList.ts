/*
143. Reorder List
Medium

You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

Example 1:


Input: head = [1,2,3,4]
Output: [1,4,2,3]
Example 2:


Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
 

Constraints:

The number of nodes in the list is in the range [1, 5 * 104].
1 <= Node.val <= 1000
*/
/**
 * Definition for singly-linked list.
*/
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
}

/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
  if(head.next === null){
    return
  }

  /**
   * Approach:
   * - get a pointer to middle and end
   * - reverse the second half from middle to end (keeping the pointer to the new end)
   * - merge from both end (start and new end)
   */

  //find mid-point of linked list using slow and fast pointer
  let slowPointer = head
  let fastPointer = head.next
  while(
    fastPointer !== null //reached outside of a list with even length
    && fastPointer.next !== null //reached the end of a list with odd length
  ){
    slowPointer = slowPointer.next
    fastPointer = fastPointer.next.next
  }
  //once this loop ends, slowPointer will be at
  // one element to the left of mid-point for even list
  // right in the middle for odd list

  let secondHalf = reverseList(slowPointer.next) //secondHalfOfListStartingFromTheBack
  slowPointer.next = null //break first half from second half
  let firstHalf = head //firstHalfOfListStartingFromTheFront
  let firstHalfNext = firstHalf.next
  let secondHalfNext = secondHalf.next

  let newReorderedListHead = firstHalf
  let newReorderedListTail = firstHalf
  firstHalf = firstHalfNext
  let lastInsertedIsFromFirstHalf = true
  while(firstHalf !== null && secondHalf !== null){
    firstHalfNext = firstHalf.next
    secondHalfNext = secondHalf.next

    if(lastInsertedIsFromFirstHalf){
      //insert from second half
      newReorderedListTail.next = secondHalf
      newReorderedListTail = newReorderedListTail.next
      secondHalf = secondHalfNext
      lastInsertedIsFromFirstHalf = false
    }else{
      //insert from first half
      newReorderedListTail.next = firstHalf
      newReorderedListTail = newReorderedListTail.next
      firstHalf = firstHalfNext
      lastInsertedIsFromFirstHalf = true
    }
  }
  if(firstHalf === null){
    newReorderedListTail.next = secondHalf
  }else if(secondHalf === null){
    newReorderedListTail.next = firstHalf
  }

  head = newReorderedListHead
  //shouldn't really do anything since both share the same reference
};

function reverseList(head: ListNode | null): ListNode | null {
  if(head === null) { return null }

  let prev: ListNode | null = null
  let curr: ListNode | null = head
  while(curr !== null){
    [curr.next, prev, curr] = [prev, curr, curr.next]
  }

  return prev
};