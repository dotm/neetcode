/*
21. Merge Two Sorted Lists
Easy
20.6K
1.9K
Companies
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

 

Example 1:


Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]
 

Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if(list1 === null){
    return list2
  }
  if(list2 === null){
    return list1
  }

  let comparedNode1: ListNode | null = list1
  let comparedNode2: ListNode | null = list2
  let nextNode1: ListNode | null = comparedNode1.next
  let nextNode2: ListNode | null = comparedNode2.next

  let newListHead: ListNode | null = null
  let newListTail: ListNode | null = null
  if(comparedNode1.val>comparedNode2.val){
    newListHead = comparedNode2
    newListTail = comparedNode2
    comparedNode2 = nextNode2
  }else{
    newListHead = comparedNode1
    newListTail = comparedNode1
    comparedNode1 = nextNode1
  }
  while(comparedNode1 !== null && comparedNode2 !== null){
    nextNode1 = comparedNode1.next
    nextNode2 = comparedNode2.next

    if(comparedNode1.val>comparedNode2.val){
      newListTail.next = comparedNode2
      newListTail = comparedNode2
      comparedNode2 = nextNode2
    }else{
      newListTail.next = comparedNode1
      newListTail = comparedNode1
      comparedNode1 = nextNode1
    }
  }
  if(comparedNode1 === null){
    newListTail.next = comparedNode2
  }else if(comparedNode2 === null){
    newListTail.next = comparedNode1
  }

  return newListHead
};