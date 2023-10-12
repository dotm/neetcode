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