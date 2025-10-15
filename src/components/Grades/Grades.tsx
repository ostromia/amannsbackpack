import FilterButton from "~/components/FilterButton";
import data from "~/components/Grades/data.ts";

type Props = {
    toggleGrades: (value: string) => void;
};

function Grades({ toggleGrades }: Props) {
    return (
        <div className="grades classes">
            {data.map((i) => (
                <FilterButton
                    key={i.name}
                    onClick={() => {
                        toggleGrades(i.name);
                    }}
                >
                    <span className="dot" style={{ backgroundColor: i.color }}></span>
                </FilterButton>
            ))}
        </div>
    );
}

export default Grades;
