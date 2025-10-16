import { useState } from "react";

import cosmeticsJSON from "~/assets/cosmetics.json";
import Classes from "~/components/Classes";
import Filters from "~/components/Filters";
import Grades from "~/components/Grades";
import Search from "~/components/Search";
import Table from "~/components/Table";
import "~/styles/App.scss";

const cosmetics = [...cosmeticsJSON].sort((a, b) => {
    const dateA = new Date(a.update[0].replace(" Patch", "")).getTime();
    const dateB = new Date(b.update[0].replace(" Patch", "")).getTime();
    return dateB - dateA;
});

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
    const [grades, toggleGrades] = useToggleSet();

    return (
        <>
            <div className="filters-wrapper">
                <div className="search-wrapper">
                    <Search search={search} setSearch={setSearch} />
                    <Filters />
                </div>

                <div className="filters">
                    <Classes toggleClasses={toggleClasses} />
                    <Grades toggleGrades={toggleGrades} />
                </div>
            </div>

            <Table cosmetics={cosmetics} classes={classes} grades={grades} search={search} />
        </>
    );
}

export default App;
