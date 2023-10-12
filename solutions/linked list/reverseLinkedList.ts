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

function reverseList(head: ListNode | null): ListNode | null {
  if(head === null) {
      return null
  }

  let prev: ListNode | null = null
  let tmp: ListNode | null = null //for storing next
  let curr: ListNode | null = head
  while(curr !== null){
    tmp = curr.next
    curr.next = prev
    prev = curr
    curr = tmp
    //can be shortened to
    //[curr.next, prev, curr] = [prev, curr, curr.next]
  }

  return prev
};