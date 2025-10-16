export interface Cosmetic {
    name: string;
    class: string[];
    update: string[];
    restriction: string;
    url: string;
    src: string;
    grade: string;
    date: string;
    gradeColor: string;
}

declare module "./cosmetics.json" {
    const value: Cosmetic[];
    export default value;
}
