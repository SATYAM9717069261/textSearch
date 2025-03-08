# Trie-Based Keyword Highlighter  

This project is a **Vite + React** application that provides **multiple search options** and a **live keyword highlighting** feature using a **Trie tree**.  

## Features  
- 🔍 **Multiple Keyword Search** – Users can input multiple keywords for highlighting.  
- ✍️ **Live Text Processing** – A text field allows users to enter a long paragraph, and matching keywords are automatically **highlighted in bold**.  
- ⚡ **Efficient Trie-Based Matching** – Uses a **Trie data structure** to efficiently find and highlight overlapping and consecutive keyword occurrences.  
- 🚀 **Optimized Performance** – Merges overlapping keyword matches to avoid redundant highlights.  

## 🛠️ Technologies Used  
- **Vite** – Fast build tool for modern web development  
- **React** – UI framework for dynamic rendering  
- **useState & useEffect** – For state management and real-time updates  
- **JavaScript Trie Implementation** – Efficient keyword searching  

## 📌 How It Works  
1. **Users enter search keywords.**  
2. **They input a long paragraph.**  
3. **The app processes the text and highlights all matching keywords in bold.**  
4. **It ensures that overlapping keywords do not cause duplicate highlights.**  

## 🚀 Getting Started  
Efficiently Adding Bold Tags to Matching Substrings
The goal is to identify all substrings in a given string s that match any word from a list words, then wrap these substrings in <b></b> tags while ensuring proper merging of overlapping or consecutive matches.

To accomplish this efficiently, we use a Trie data structure, which is well-suited for prefix-based matching, enabling us to quickly find substrings that match any of the given words.

Solution Approach
The solution follows a structured process involving Trie construction, substring search, range merging, and string reconstruction:

1. Building the Trie
We first construct a Trie to store all words in words. Each node in the Trie contains:

An array of child pointers (covering all possible ASCII characters, typically 128).
A boolean flag is_end to mark the end of a valid word.
For each word in words, we insert it into the Trie. This allows efficient prefix-based searching when scanning s.

2. Searching for Matching Substrings
We iterate through each character in s, using the Trie to check if the current substring (from that position onward) matches any word in words.

If a match is found (i.e., we reach a node with is_end = True), we store the start and end indices of this match.
We continue checking further characters to detect longer matches.
This step ensures that all occurrences of words from words in s are recorded.

3. Merging Overlapping and Consecutive Ranges
Since multiple matches may overlap or be adjacent, we merge these ranges into a single continuous range whenever necessary:

Sort the list of index pairs.
Iterate through them, merging consecutive or overlapping ranges into a single range.
Store the final set of merged ranges.
This step prevents unnecessary redundant bold tags and ensures a clean output.

4. Constructing the Output String with Bold Tags
We now iterate over s, inserting <b> and </b> tags at the appropriate positions based on the merged ranges:

Non-bold text is added as-is.
When encountering a bolded range, we insert <b>, append the bolded substring, and close it with </b>.
We continue this process until all characters are processed.
To ensure efficiency, we use a list to build the output string rather than modifying it directly (since string operations in Python are expensive).

5. Returning the Final Result
After constructing the list representation of the modified string, we join all parts together to produce the final output with properly formatted bold tags.

Why This Approach Works Well
✅ Efficient String Matching → The Trie provides an optimal way to detect substrings in s that match words.
✅ Optimized Merging → Avoids redundant tags by merging overlapping or consecutive ranges.
✅ Fast String Construction → Using a list ensures efficient string concatenation.

This approach results in a time complexity of O(N + M), where:

N is the length of s (since we scan it once).
M is the total length of all words in words (as we build the Trie and search it efficiently).
The final implementation is both clean and efficient, ensuring proper bold formatting of matching substrings. 🚀


Implentation

class Tree {
    constructor(value) {
        this.childs = []
        this.value = value
        this.end = false  // [HelloWorld,Hello] at the end of Hello we need end, which indicate 2nd element end
    }
}
Tree.prototype.insertchild = function(value) {
    const child = new Tree(value);
    this.childs.push(child); // parentNode.insertchild(val)
    return child;
}
class Trie {
    constructor() { this.root = new Tree(null); }
    insertString(str, root = this.root, start = 0) {
        if (start >= str.length) {
            root.end = true;
            return;
        }
        let i = 0
        while (i < root.childs.length) {
            if (str[start] == root.childs[i].value) {
                this.insertString(str, root.childs[i], start + 1);
                return;
            }
            i++;
        }
        if (i == root.childs.length) {
            const newroot = root.insertchild(str[start])
            this.insertString(str, newroot, start + 1);
        }
    }

    findString(root, str, str_current, f_start, result) { // return  Array[{start,end}]
        if (root.end == true)
            result.push({ start: f_start, end: str_current - 1 })
        if (str_current >= str.length)
            return result;
        let i = 0;
        while (i < root.childs.length) {
            if (root.childs[i].value == str[str_current]) {
                if (root.value == null) {
                    return this.findString(root.childs[i], str, str_current + 1, str_current, result);
                } else {
                    return this.findString(root.childs[i], str, str_current + 1, f_start, result);
                }
            }
            i++;
        }
        if (i == root.childs.length) {
            if (root.value == null) {
                return this.findString(this.root, str, str_current + 1, str_current + 1, result)
            } else {
                return this.findString(this.root, str, str_current, str_current, result)
            }
        }
        return result;
    }

}
function mergeOverlaps(intervals) {
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
function solution(str, searchs) {
    const trie = new Trie();  // root.root
    searchs.forEach(element => {
        trie.insertString(element)
    });
    const intervals = mergeOverlaps(trie.findString(trie.root, str, 0, 0, []));
    let result = ""
    let i = 0;
    let intervals_index = 0;
    while (i < str.length) {
        if (intervals_index < intervals.length && intervals[intervals_index].start == i) {
            result += `<b>${str.substring(intervals[intervals_index].start, intervals[intervals_index].end + 1)}</b>`
            i = intervals[intervals_index].end;
            intervals_index++;
        } else {
            result += str[i]
        }
        i++;
    }
    return result;
}
function runTests() {
    const testCases = [
        {
            input: { str: "HelloWorld", searchs: ["Hello", "World"] },
            expected: "<b>Hello</b><b>World</b>"
        },
        {
            input: { str: "HelloWorld", searchs: ["Hell", "World"] },
            expected: "<b>Hell</b>o<b>World</b>"
        },
        {
            input: { str: "HelloHelloWorld", searchs: ["Hello"] },
            expected: "<b>Hello</b><b>Hello</b>World"
        },
        {
            input: { str: "abcdefg", searchs: ["abc", "efg"] },
            expected: "<b>abc</b>d<b>efg</b>"
        },
        {
            input: { str: "abcabcabc", searchs: ["abc"] },
            expected: "<b>abc</b><b>abc</b><b>abc</b>"
        },
        {
            input: { str: "teststring", searchs: ["test", "string"] },
            expected: "<b>test</b><b>string</b>"
        },
        {
            input: { str: "mississippi", searchs: ["iss", "ppi"] },
            expected: "m<b>iss</b>issi<b>ppi</b>"
        },
        {
            input: { str: "aaaabaaa", searchs: ["aaa"] },
            expected: "<b>aaa</b>ba<b>aaa</b>"
        },
        {
            input: { str: "bananabanana", searchs: ["banana"] },
            expected: "<b>banana</b><b>banana</b>"
        },
        {
            input: { str: "randomwords", searchs: ["words", "random"] },
            expected: "<b>random</b><b>words</b>"
        }
    ];

    testCases.forEach(({ input, expected }, index) => {
        console.log(`Running Test Case ${index + 1}:`);
        console.log(`Input: str="${input.str}", searchs=${JSON.stringify(input.searchs)}`);
        console.log("Expected Output:", expected);
        console.log("Actual Output:", solution(input.str, input.searchs));
        console.log("\n");
    });
}

runTests();


### 1️⃣ Clone the repository  
```sh
git clone <repo-url>
cd my-search-app

git clone https://github.com/SATYAM9717069261/textSearch.git
cd textSearch


