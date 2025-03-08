import { useEffect, useState } from "react";
export default function TagList({ searchFields, setSearchFields }) {
    const [tags, setTags] = useState([...searchFields]);
    useEffect(() => {
        setTags(searchFields);
    }, [searchFields]);

    if (tags[0] == "")
        return;

    const removeTag = (index) => {
        setSearchFields(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="flex gap-3 overflow-x-auto p-3 bg-gray-100 rounded-md">
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md text-gray-800 text-sm font-medium"
                >
                    {tag}

                    <button
                        onClick={() => removeTag(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3 h-3"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12.828l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                </div>
            ))}
        </div>
    );
}

