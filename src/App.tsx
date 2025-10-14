import { useState } from "react";

import Search from "~/components/Search";
import "~/styles/App.scss";

function App() {
    const [search, setSearch] = useState<string>("");

    return (
        <>
            <Search search={search} setSearch={setSearch} />

            <div id="results">{search}</div>
        </>
    );
}

export default App;
