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

### 1️⃣ Clone the repository  
```sh
git clone <repo-url>
cd my-search-app
