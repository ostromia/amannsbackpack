declare module './cosmetics.json' {
    interface Cosmetic {
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

    const value: Cosmetic[];
    export default value;
}
