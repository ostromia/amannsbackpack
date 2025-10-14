import "~/components/Search/Search.scss";

type Props = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

function Search({ search, setSearch }: Props) {
    return (
        <input
            id="search"
            type="text"
            value={search}
            onChange={(i) => {
                setSearch(i.target.value);
            }}
            placeholder="Search for items.."
        />
    );
}

export default Search;
