import { useState } from "react";

import Classes from "~/components/Classes";
import Search from "~/components/Search";
import "~/styles/App.scss";

function useToggleSet(): [Set<string>, (value: string) => void] {
    const [values, setValues] = useState<Set<string>>(() => new Set());

    const toggle = (value: string) => {
        setValues((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
            return newSet;
        });
    };

    return [values, toggle];
}

function App() {
    const [search, setSearch] = useState<string>("");
    const [classes, toggleClasses] = useToggleSet();

    return (
        <>
            <div className="filters">
                <Search search={search} setSearch={setSearch} />

                <Classes toggleClasses={toggleClasses} />
            </div>

            <div id="results">
                {search}
                {classes}
            </div>
        </>
    );
}

export default App;
