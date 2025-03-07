import { useState } from "react";
import { Dialog } from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import SearchDialog from "./components/ui/textSearch";
import TagList from "./components/ui/taglist";

export default function App() {
    const [searchFields, setSearchFields] = useState([""]);
    const [text, setText] = useState("");
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [tempSearch, setTempSearch] = useState([])

    const openPopup = () => {
        setTempSearch([]);
        setPopupOpen(true);
    };
    const closePopup = () => {
        setSearchFields([...searchFields, ...tempSearch]);
        setPopupOpen(false);
    };

    const addTempSearchField = () => {
        setTempSearch([...tempSearch, ""]);
    };
    return (
        <div className="p-6 w-full min-h-screen bg-gray-900 text-white flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-center bg-blue-600 p-4 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold">Keyword Highlighter</h1>
                <Button onClick={openPopup} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg shadow-md">
                    + Add Search Field
                </Button>
                <Button onClick={() => setPopupOpen(true)} className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md">View Source Code</Button>
            </div>

            {/* Source Code Popup */}
            <Dialog open={isPopupOpen} onOpenChange={setPopupOpen}>
                <div className="p-4 bg-gray-800 text-white rounded-lg shadow-xl">
                    <h2 className="text-lg font-bold">Source Code</h2>
                    <pre className="bg-gray-700 p-3 rounded-md mt-2 overflow-auto max-h-60">// Source code will be here</pre>
                    <Button onClick={() => setPopupOpen(false)} className="mt-3 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">Close</Button>
                </div>
            </Dialog>
            <TagList />
            {/* Search Fields */}
            <SearchDialog
                isOpen={isPopupOpen}
                onClose={closePopup}
                tempSearch={tempSearch}
                setTempSearch={setTempSearch}
                addTempSearchField={addTempSearchField}
            />
            {/* Paragraph Input */}
            <div
                contentEditable
                className="w-full min-h-[150px] p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Enter paragraph here..."
                onInput={(e) => setText(e.currentTarget.innerHTML)}
            ></div>
        </div>
    );
}
