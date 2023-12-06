/*
56. Merge Intervals
Medium
21.2K
728
Companies
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
*/
function merge(intervals: number[][]): number[][] {
    if(intervals.length === 0){
        return []
    }else if(intervals.length === 1){
        return intervals
    }

    intervals = intervals.sort((a,b)=>a[0]-b[0])
    const nonOverlappingIntervals: number[][] = [intervals.shift() ?? []] //the `?? []` is to pacify typescript
    while(intervals.length > 0){
        const currentInterval = nonOverlappingIntervals.pop()
        const nextInterval = intervals.shift()
        if(currentInterval===undefined){break}//pacify typescript
        if(nextInterval===undefined){break}//pacify typescript
        if(currentInterval[1] < nextInterval[0]){
            //current interval is smaller and doesn't overlap with next interval
            nonOverlappingIntervals.push(currentInterval, nextInterval)
        }else if(currentInterval[0] > nextInterval[1]){
            //impossible because intervals is sorted
        }else{
            //current and next interval overlap
            nonOverlappingIntervals.push([
                Math.min(currentInterval[0], nextInterval[0]),
                Math.max(currentInterval[1], nextInterval[1])
            ])
        }
    }
    return nonOverlappingIntervals
};