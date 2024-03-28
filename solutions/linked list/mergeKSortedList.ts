/*
23. Merge k Sorted Lists
Hard
18.7K
673
Companies
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

 

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []
 

Constraints:

k == lists.length
0 <= k <= 104
0 <= lists[i].length <= 500
-104 <= lists[i][j] <= 104
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 104.
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

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if(lists.length === 0){
    return null
  }
  while (lists.length !== 1){
    const first = (lists.pop() as ListNode)
    const second = (lists.pop() as ListNode)
    lists.push(mergeTwoLists(first, second))
  }
  return lists[0]
};


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
  //stick the rest of the other linked list if one linked list is empty
  if(comparedNode1 === null){
    newListTail.next = comparedNode2
  }else if(comparedNode2 === null){
    newListTail.next = comparedNode1
  }

  return newListHead
};