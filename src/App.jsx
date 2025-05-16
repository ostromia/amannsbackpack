import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./App.scss";

import class_icons from "./class-icons";

import ButtonIcon from "./ButtonIcon";

import cosmeticsJSON from "./cosmetics.json";

const cosmetics = [...cosmeticsJSON].sort((a, b) => {
    const dateA = new Date(a.update[0].replace(" Patch", "")).getTime();
    const dateB = new Date(b.update[0].replace(" Patch", "")).getTime();
    return dateA - dateB;
});

function App() {

  return (
    <>
        <div id="wrapper-filters">
            {/* <input id="searchbar" bind:value={searchQuery} type="text" placeholder="Search for items.."/> */}
            <input id="searchbar" type="text" placeholder="Search for items.."/>

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

        {/* <div style="display: none">
            <input type="checkbox" id="Scout" name="Scout" value="Scout" bind:group={filters.class}/>
            <input type="checkbox" id="Soldier" name="Soldier" value="Soldier" bind:group={filters.class}/>
            <input type="checkbox" id="Pyro" name="Pyro" value="Pyro" bind:group={filters.class}/>
            <input type="checkbox" id="Demoman" name="Demoman" value="Demoman" bind:group={filters.class}/>
            <input type="checkbox" id="Heavy" name="Heavy" value="Heavy" bind:group={filters.class}/>
            <input type="checkbox" id="Engineer" name="Engineer" value="Engineer" bind:group={filters.class}/>
            <input type="checkbox" id="Medic" name="Medic" value="Medic" bind:group={filters.class}/>
            <input type="checkbox" id="Sniper" name="Sniper" value="Sniper" bind:group={filters.class}/>
            <input type="checkbox" id="Spy" name="Spy" value="Spy" bind:group={filters.class}/>

            <input type="checkbox" id="Unique" name="Unique" value="Unique" bind:group={filters.grade}/>
            <input type="checkbox" id="Genuine" name="Genuine" value="Genuine" bind:group={filters.grade}/>
            <input type="checkbox" id="Mercenary" name="Mercenary" value="Mercenary" bind:group={filters.grade}/>
            <input type="checkbox" id="Commando" name="Commando" value="Commando" bind:group={filters.grade}/>
            <input type="checkbox" id="Assassin" name="Assassin" value="Assassin" bind:group={filters.grade}/>
            <input type="checkbox" id="Elite" name="Elite" value="Elite" bind:group={filters.grade}/>
        </div> */}






      <section id="table">
        {cosmetics.map((item) => {
          return (
            <div className="item-wrapper" id={item.name} key={item.name}>
              <a href={item.url}>
                <img alt={item.name} className="item-image" src={`cosmetics/${item.name.replace("?", "").replace("%", "")}.png`} />
              </a>
              <div className="underline" style={{ backgroundColor: item.gradeColor }}></div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
