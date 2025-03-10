import { useEffect, useState } from "react"
import highlight from "../../helper/highlightText";
const defaultext = `Efficiently Adding Bold Tags to Matching Substrings The goal is to identify all substrings in a given string s that match any word from a list words, then wrap these substrings in tags while ensuring proper merging of overlapping or consecutive matches. To accomplish this efficiently, we use a Trie data structure, which is well - suited for prefix - based matching, enabling us to quickly find substrings that match any of the given words. Solution Approach The solution follows a structured process involving Trie construction, substring search, range merging, and string reconstruction: 1. Building the Trie We first construct a Trie to store all words in words.Each node in the Trie contains: An array of child pointers(covering all possible ASCII characters, typically 128). A boolean flag is_end to mark the end of a valid word. For each word in words, we insert it into the Trie.This allows efficient prefix - based searching when scanning s. 2. Searching for Matching Substrings We iterate through each character in s, using the Trie to check if the current substring(from that position onward) matches any word in words. If a match is found(i.e., we reach a node with is_end = True), we store the start and end indices of this match. We continue checking further characters to detect longer matches. This step ensures that all occurrences of words from words in s are recorded. 3. Merging Overlapping and Consecutive Ranges Since multiple matches may overlap or be adjacent, we merge these ranges into a single continuous range whenever necessary: Sort the list of index pairs. Iterate through them, merging consecutive or overlapping ranges into a single range. Store the final set of merged ranges. This step prevents unnecessary redundant bold tags and ensures a clean output. 4. Constructing the Output String with Bold Tags We now iterate over s, inserting < b > and tags at the appropriate positions based on the merged ranges: Non - bold text is added as- is. When encountering a bolded range, we insert < b >, append the bolded substring, and close it with . We continue this process until all characters are processed. To ensure efficiency, we use a list to build the output string rather than modifying it directly(since string operations in Python are expensive). 5. Returning the Final Result After constructing the list representation of the modified string, we join all parts together to produce the final output with properly formatted bold tags. Why This Approach Works Well ✅ Efficient String Matching → The Trie provides an optimal way to detect substrings in s that match words. ✅ Optimized Merging → Avoids redundant tags by merging overlapping or consecutive ranges. ✅ Fast String Construction → Using a list ensures efficient string concatenation. This approach results in a time complexity of O(N + M), where: N is the length of s(since we scan it once). M is the total length of all words in words(as we build the Trie and search it efficiently). The final implementation is both clean and efficient, ensuring proper bold formatting of matching substrings. 🚀`;
export default function TextArea({ searchFields }) {
    const [htmltext, sethtmltext] = useState(defaultext);
    useEffect(() => {
        sethtmltext(prev => {
            if (prev == "") {
                return prev
            } else {
                const result = highlight(defaultext, searchFields)
                console.log(htmltext, "\n Fireld =>", searchFields, "\n result =>", result)
                return result
            }
        })
    }, [searchFields])
    return <div
        contentEditable
        className="w-full min-h-[150px] p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
        placeholder="Enter paragraph here..."
        onBlur={(e) => sethtmltext(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: htmltext }} // Correct way to set HTML
    ></div>
}
