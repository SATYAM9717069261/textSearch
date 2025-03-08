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
export default Trie;
