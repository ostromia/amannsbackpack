import "./styles/App.scss";
import cosmeticsJSON from "./assets/cosmetics.json";

const cosmetics = [...cosmeticsJSON].sort((a, b) => {
    const dateA = new Date(a.update[0].replace(" Patch", "")).getTime();
    const dateB = new Date(b.update[0].replace(" Patch", "")).getTime();
    return dateA - dateB;
});

function App() {
    return (
        <>
            <div id="cosmetics-table">
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
            </div>
        </>
    );
}

export default App;
