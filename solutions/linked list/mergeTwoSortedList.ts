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