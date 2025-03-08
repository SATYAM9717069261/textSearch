import { useState } from "react";
import { Dialog } from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import SearchDialog from "./components/ui/textSearch";
import TagList from "./components/ui/taglist";
import TextArea from "./components/ui/textArea";

export default function App() {
    const [searchFields, setSearchFields] = useState([
        "substrings",
        "Solution Approach",
        "Efficiently Adding Bold Tags ",
        "Building the Trie ",
        "A boolean flag to mark the end ",
        "Trie"
    ]);
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };
    const closePopup = () => {
        setPopupOpen(false);
    }
    const closeSearchPopup = (tempSearch) => {
        setSearchFields([...tempSearch]);
        setPopupOpen(false);
    };
    return (
        <div className="p-6 w-full min-h-screen bg-gray-900 text-white flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-center bg-blue-600 p-4 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold">Keyword Highlighter</h1>
                <Button onClick={openPopup} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg shadow-md">
                    + Add Search Field
                </Button>
            </div>

            {/* Source Code Popup */}
            <Dialog open={isPopupOpen} onOpenChange={setPopupOpen}>
                <div className="p-4 bg-gray-800 text-white rounded-lg shadow-xl">
                    <h2 className="text-lg font-bold">Source Code</h2>
                    <pre className="bg-gray-700 p-3 rounded-md mt-2 overflow-auto max-h-60">// Source code will be here</pre>
                    <Button onClick={() => setPopupOpen(false)} className="mt-3 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">Close</Button>
                </div>
            </Dialog>
            <TagList searchFields={searchFields} setSearchFields={setSearchFields} />
            {/* Search Fields */}
            <SearchDialog
                isOpen={isPopupOpen}
                onClose={closePopup}
                searchFields={searchFields}
                closeSearchPopup={closeSearchPopup}
            />
            {/* Paragraph Input */}
            <TextArea searchFields={searchFields} />
        </div>
    );
}
