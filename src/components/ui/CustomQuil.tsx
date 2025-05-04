import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from "react";
import 'react-quill-new/dist/quill.snow.css';

export function CustomQuill({ onChange, value, disabled }: { onChange: (value: string) => void; value: string; disabled?: boolean }) {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), { ssr: false }), []);

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ direction: "rtl" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "link",
        "color",
        "align",
    ];

    if (!isClient) {
        return null; // or a loader
    }

    return (
        <div>
            <ReactQuill
                className="mt-4 text-slate-700 bg-white shadow-lg"
                theme="snow"
                modules={modules}
                formats={formats}
                onChange={onChange}
                value={value}
                style={{ minHeight: "400px" }}
                readOnly={disabled}
            />
        </div>
    );
}

export default CustomQuill;
