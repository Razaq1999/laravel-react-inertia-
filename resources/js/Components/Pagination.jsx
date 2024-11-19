import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    console.log(links);

    return (
        <nav className="mt-4 text-center">
            {links.map((link, index) => (
                <Link
                preserveScroll
                    key={index}
                    href={link.url || "#"} // Use '#' if link.url is null
                    className={`mx-1 px-3 py-2 border rounded-lg text-xs inline-block ${
                        link.active
                            ? "bg-gray-900 text-white border-blue-500" // Style for active link
                            : "bg-white text-blue-500 border-gray-300 hover:bg-gray-100"
                    } ${!link.url ? "text-gray-500 cursor-not-allowed" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
}
