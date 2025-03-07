import { useState } from "react";

export function Dialog({ open, onOpenChange, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                {children}
                <button onClick={() => onOpenChange(false)} className="mt-2 bg-red-500 text-white p-2 rounded">
                    Close
                </button>
            </div>
        </div>
    );
}

