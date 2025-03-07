import { Dialog } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";

export default function SearchDialog({ isOpen, onClose, tempSearch, setTempSearch, addTempSearchField, }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <div className="p-4 bg-gray-800 text-white rounded-lg shadow-xl max-w-lg mx-auto">
                <h2 className="text-lg font-bold mb-2">Add Search Keywords</h2>

                {/* Search Inputs inside Popup */}
                <div className="flex flex-col gap-2">
                    {tempSearch.map((_, index) => (
                        <Input
                            key={index}
                            type="text"
                            placeholder="Enter keyword..."
                            className="bg-gray-700 border border-gray-600 text-white"
                            onChange={(e) => {
                                let updated = [...tempSearch];
                                updated[index] = e.target.value;
                                setTempSearch(updated);
                            }}
                        />
                    ))}
                </div>

                {/* Add New Search Field Button */}
                <Button onClick={addTempSearchField} className="mt-3 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
                    + Add More
                </Button>

                {/* Save & Close Popup */}
                <Button onClick={onClose} className="mt-3 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md">
                    Save & Close
                </Button>
            </div>
        </Dialog>
    );
}


