import mergeOverlaps from "./mergeOverlap";
import Trie from "./trie";

export default function highlight(str, searchs) {
    const trie = new Trie() // on remove key we have to recreate 
    searchs.forEach(element => {
        if (element !== "")
            trie.insertString(element)
    });
    const intervals = mergeOverlaps(trie.findString(trie.root, str, 0, 0, []));
    let result = ""
    let i = 0;
    let intervals_index = 0;
    while (i < str.length) {
        if (intervals_index < intervals.length && intervals[intervals_index].start == i) {
            result += `<bold>${str.substring(intervals[intervals_index].start, intervals[intervals_index].end + 1)}</bold>`
            i = intervals[intervals_index].end;
            intervals_index++;
        } else {
            result += str[i]
        }
        i++;
    }
    return result;
}

