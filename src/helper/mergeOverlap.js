export default function mergeOverlaps(intervals) {
    if (intervals.length == 0)
        return intervals
    let i = 1;
    const newInterval = [];
    newInterval.push(intervals[0]);
    while (i < intervals.length) {
        if ((intervals[i].start - 1) <= newInterval[newInterval.length - 1].end) // no overlap concecutive => intervals[i].start <= newInterval[newInterval.length - 1].end
            newInterval[newInterval.length - 1].end = intervals[i].end;
        else
            newInterval.push(intervals[i]);
        i++;
    }
    return newInterval
}
