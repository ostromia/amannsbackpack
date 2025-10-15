import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
    onClick: () => void;
    children: ReactNode;
};

export default function IconButton({ onClick, children }: Props) {
    const [clicked, setClicked] = useState(false);

    return (
        <button
            type="button"
            onClick={() => {
                onClick();
                setClicked(!clicked);
            }}
            style={{
                backgroundColor: clicked ? "#342E29" : "lightgray",
                border: "none",
                padding: 2,
                height: 30,
                width: 30,
                cursor: "pointer"
            }}
        >
            {children}
        </button>
    );
}
