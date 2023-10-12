function insert(intervals: number[][], newInterval: number[]): number[][] {
    let newIntervalList: number[][] = []
    for(let i=0; i<intervals.length+1;i++){
        if(i===intervals.length){
            //new interval is bigger than and doesn't overlap
            //with every interval in the list
            newIntervalList.push(newInterval)
            return newIntervalList
        }
        if(newInterval[1] < intervals[i][0]){
            //new interval is smaller and doesn't overlap with current interval
            newIntervalList.push(newInterval, ...intervals.slice(i))
            return newIntervalList
        }else if(newInterval[0] > intervals[i][1]){
            //new interval is bigger and doesn't overlap with current interval
            newIntervalList.push(intervals[i])
            continue
        }else{
            //new interval overlap with current interval
            newInterval = [
                Math.min(newInterval[0],intervals[i][0]),
                Math.max(newInterval[1],intervals[i][1]),
            ]
            //continue with the iteration because this new interval
            //can overlap with the next interval
        }
    }
    return newIntervalList
};