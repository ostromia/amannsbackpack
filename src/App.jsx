import { useState } from "react";
import "./styles/App.scss";

import class_icons from "./assets/class-icons";

import ButtonIcon from "./components/ButtonIcon";

import cosmeticsJSON from "./assets/cosmetics.json";

import classesJSON from "./assets/classes.json";
import gradesJSON from "./assets/grades.json";

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

    function shouldDisplay(item) {
        return (
            (classes.size === 0 || Array.from(classes).some((i) => item.class.includes(i))) &&
            (grades.size === 0 || grades.has(item.grade)) &&
            (search.trim() === '' || item.name.toLowerCase().includes(search.trim()))
        );
    }

    return (
        <>
        <div id="wrapper-filters">
            <input id="searchbar" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for items.."/>

            <div className="wrapper-filter">
                <ButtonIcon><label htmlFor="Scout"><img alt="" src={class_icons.scout}/></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Soldier"><img alt="" src={class_icons.soldier}/></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Pyro"><img alt="" src={class_icons.pyro}/></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Demoman"><img alt="" src={class_icons.demoman}/></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Heavy"><img alt="" src={class_icons.heavy}/></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Engineer"><img alt="" src={class_icons.engineer}/></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Medic"><img alt="" src={class_icons.medic}/></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Sniper"><img alt="" src={class_icons.sniper}/></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Spy"><img alt="" src={class_icons.spy}/></label></ButtonIcon>
            </div>

            <div className="wrapper-filter">
                <ButtonIcon><label htmlFor="Unique"><span className="dot" style={{backgroundColor: "#FFD700"}}></span></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Genuine"><span className="dot" style={{backgroundColor: "#4D7455"}}></span></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Mercenary"><span className="dot" style={{backgroundColor: "#4B69FF"}}></span></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Commando"><span className="dot" style={{backgroundColor: "#8847FF"}}></span></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Assassin"><span className="dot" style={{backgroundColor: "#D32CE6"}}></span></label></ButtonIcon>
                <ButtonIcon><label htmlFor="Elite"><span className="dot" style={{backgroundColor: "#EB4B4B"}}></span></label></ButtonIcon>
            </div>
        </div>

        <div style={{display: "none"}}>
            {classesJSON.map((i) => {
                return (
                    <input key={i} type="checkbox" id={i} name={i} value={i} onChange={() => toggleClass(i)} />
                );
            })}

            {gradesJSON.map((i) => {
                return (
                    <input key={i} type="checkbox" id={i} name={i} value={i} onChange={() => toggleGrade(i)} />
                );
            })}
        </div>

            <div id="cosmetics-table">
                {cosmetics.map((item) => {
                    return (
                        <div className="item-wrapper" id={item.name} key={item.name} style={{ display: shouldDisplay(item) ? 'block' : 'none' }}>
                            <a href={item.url}>
                                <img alt={item.name} className="item-image" src={`cosmetics/${item.name.replace("?", "").replace("%", "")}.png`} />
                            </a>
                            <div className="underline" style={{ backgroundColor: item.gradeColor }}></div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default App;

