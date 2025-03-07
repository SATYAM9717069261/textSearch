export function Input({ className = "", ...props }) {
    return (
        <input
            className={`w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
            {...props}
        />
    );
}
