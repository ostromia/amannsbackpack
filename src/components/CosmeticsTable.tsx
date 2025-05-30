import { useEffect, useState } from "react";

type Cosmetic = {
    name: string;
    class: string[];
    update: string[];
    restriction: string;
    url: string;
    src: string;
    date: string;
    grade: string;
    gradeColor: string;
};

type Props = {
    cosmetics: Cosmetic[];
    classes: Set<string>;
    grades: Set<string>;
    search: string;
};

function CosmeticsTable({ cosmetics, classes, grades, search }: Props) {
    const [loadedCount, setLoadedCount] = useState(50);

    useEffect(() => {
        if (loadedCount >= cosmetics.length) return;
        const interval = setInterval(() => {
            setLoadedCount((prev) => {
                const next = prev + 50;
                if (next >= cosmetics.length) clearInterval(interval);
                return next;
            });
        }, 200);
        return () => clearInterval(interval);
    }, [cosmetics.length, loadedCount]);

    const shouldDisplay = (item: Cosmetic) => {
        return (
            (classes.size === 0 || Array.from(classes).some((i) => item.class.includes(i))) &&
            (grades.size === 0 || grades.has(item.grade)) &&
            (search.trim() === "" || item.name.toLowerCase().includes(search.trim()))
        );
    };

    return (
        <div id="cosmetics-table">
            {cosmetics.map((item, index) => {
                const imageSrc =
                    index < loadedCount
                        ? `cosmetics/${item.name.replace("?", "").replace("%", "")}.png`
                        : undefined;

                return (
                    <div
                        className="item-wrapper"
                        id={item.name}
                        key={item.name}
                        style={{ display: shouldDisplay(item) ? "block" : "none" }}
                    >
                        <a href={item.url}>
                            {imageSrc ? <img className="item-image" src={imageSrc} /> : <></>}
                        </a>
                        <div
                            className="underline"
                            style={{ backgroundColor: item.gradeColor }}
                        ></div>
                    </div>
                );
            })}
        </div>
    );
}

export default CosmeticsTable;
