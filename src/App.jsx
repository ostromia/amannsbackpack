import { useState } from "react";
import "./styles/App.scss";

import class_icons from "./assets/class-icons";

import ButtonIcon from "./components/ButtonIcon";

import cosmeticsJSON from "./assets/cosmetics.json";

import classesJSON from "./assets/classes.json";
import gradesJSON from "./assets/grades.json";

import CosmeticsTable from "./components/CosmeticsTable";

const cosmetics = [...cosmeticsJSON].sort((a, b) => {
    const dateA = new Date(a.update[0].replace(" Patch", "")).getTime();
    const dateB = new Date(b.update[0].replace(" Patch", "")).getTime();
    return dateA - dateB;
});

function useToggleSet() {
    const [values, setValues] = useState(new Set());

    const toggle = (value) => {
        setValues(prev => {
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
    const [search, setSearch] = useState('');
    const [classes, toggleClass] = useToggleSet();
    const [grades, toggleGrade] = useToggleSet();

    return (
        <>
            <div id="wrapper-filters">
                <input id="searchbar" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for items.."/>

                <div className="wrapper-filter">
                    {Object.entries(class_icons).map(([name, icon]) => (
                        <ButtonIcon key={name}>
                            <label htmlFor={name}>
                                <img alt={name} src={icon} />
                            </label>
                        </ButtonIcon>
                    ))}
                </div>

                <div className="wrapper-filter">
                    {Object.entries(gradesJSON).map(([key, value]) => {
                        return (
                            <ButtonIcon key={key}>
                                <label htmlFor={key}>
                                    <span className="dot" style={{backgroundColor: value}}></span>
                                </label>
                            </ButtonIcon>
                        );
                    })}
                </div>
            </div>

        <div style={{display: "none"}}>
            {classesJSON.map((i) => {
                return (
                    <input key={i} type="checkbox" id={i} name={i} value={i} onChange={() => toggleClass(i)} />
                );
            })}

            {Object.keys(gradesJSON).map((i) => {
                return (
                    <input key={i} type="checkbox" id={i} name={i} value={i} onChange={() => toggleGrade(i)} />
                );
            })}
        </div>

            <CosmeticsTable cosmetics={cosmetics} classes={classes} grades={grades} search={search} />
        </>
    );
}

export default App;

