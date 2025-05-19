import { useState } from "react";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const ToggleButton = ({ children }: Props) => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <button
            onClick={() => setIsClicked(!isClicked)}
            style={{
                backgroundColor: isClicked ? "#342E29" : "lightgray",
                height: "30px",
                width: "30px",
                paddingBlock: "2px",
                paddingInline: "2px"
            }}
        >
            {children}
        </button>
    );
};

export default ToggleButton;
