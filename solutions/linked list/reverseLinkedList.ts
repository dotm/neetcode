/*
206. Reverse Linked List
Easy
20.2K
372
Companies
Given the head of a singly linked list, reverse the list, and return the reversed list.

 

Example 1:


Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
Example 2:


Input: head = [1,2]
Output: [2,1]
Example 3:

Input: head = []
Output: []
 

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000
 

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
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