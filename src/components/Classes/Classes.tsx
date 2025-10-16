import data from "~/components/Classes/icons";
import FilterButton from "~/components/FilterButton";

type Props = {
    toggleClasses: (value: string) => void;
};

function Classes({ toggleClasses }: Props) {
    return (
        <div className="classes">
            {data.map((i) => (
                <FilterButton
                    key={i.name}
                    onClick={() => {
                        toggleClasses(i.name);
                    }}
                >
                    <img alt={i.name} src={i.image} />
                </FilterButton>
            ))}
        </div>
    );
}

export default Classes;
