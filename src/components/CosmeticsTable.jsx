import React from 'react';

export default function CosmeticsTable({ cosmetics, classes, grades, search }) {
    const shouldDisplay = (item) => {
        return (
            (classes.size === 0 || Array.from(classes).some((i) => item.class.includes(i))) &&
            (grades.size === 0 || grades.has(item.grade)) &&
            (search.trim() === '' || item.name.toLowerCase().includes(search.trim()))
        );
    };

    return (
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
    );
}
