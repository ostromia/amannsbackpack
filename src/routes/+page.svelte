<script lang="ts">
    import cosmeticsJSON from "$lib/cosmetics.json";
    import gradesJSON from "$lib/grades.json";
    import classes from "$lib/classes.json";
    import "$lib/tf2build.css";

    let searchQuery: string = "";

    const grades = [];
    for (const i in gradesJSON) {
        grades.push(gradesJSON[i].name);
    }

    function sortCosmeticsChronologically(cosmeticsJSON: any, gradesJSON: any) {
        let cosmetics = cosmeticsJSON;
        let grades = gradesJSON;

        for (let i = 0; i < cosmetics.length; i++) {
            // convert date into epoch timestamp
            let item = cosmetics[i];
            const d = new Date(item.date.toString().replace(" Patch", ""));
            item.date = d.getTime();

            // convert grade from code to name
            const c_grade = { ... grades[cosmetics[i].grade] };
            item.grade = c_grade.name;
            item.color = c_grade.color;
        }
        // get array of epoch timestamps sorted numerically
        const DATES = Array.from(new Set(cosmetics.map(i => i.date))).sort();

        // sort cosmetics in chronological order
        let cosmetics_sorted = [];
        for (let i = 0; i < DATES.length; i++) {
            let date = DATES[i];
            for (let j = 0; j < cosmetics.length; j++) {
                let item = cosmetics[j];
                if (item.date == date) {
                    cosmetics_sorted.push(item);
                }
            }
        }
        return cosmetics_sorted;
    }
    let cosmetics = sortCosmeticsChronologically(cosmeticsJSON, gradesJSON);

    let filters = {
        class: [],
        grade: []
    }

    let dateReleased: HTMLButtonElement;
    function dR_B() {
        cosmetics = cosmetics.reverse();
        dateReleased.innerHTML = "Date Released " + (dateReleased.innerHTML.includes("(Newest)") ? "(Oldest)" : "(Newest)");
    }
</script>

<div id="warning" style="text-align: center; font-family: sans-serif; color: black; background-color: darkgoldenrod">
    this webpage is a work in progress and currently doesn't work as intended - please submit a <a href="https://github.com/berkay-yalin/tf2/pulls" target="_blank">pull request</a> if you would like to contribute to development
</div>

<div id="wrapper-filters">
    <input bind:value={searchQuery} type="text" id="searchbar" placeholder="Search for items..">

    <button bind:this={dateReleased} type="button" id="date-released-button" on:click={dR_B}>
        Date Released (Oldest)
    </button>

    <div class="class-filter-wrapper">
        { #each classes as name }
            <div class="checkbox-wrapper">
                <label for={name}>{name}</label>
                <input type="checkbox" id={name} name={name} value={name} bind:group={filters.class}>
            </div>
        {/each}
    </div>

    <div class="class-filter-wrapper">
        { #each grades as name }
            <div class="checkbox-wrapper">
                <label for={name}>{name}</label>
                <input type="checkbox" id={name} name={name} value={name} bind:group={filters.grade}>
            </div>
        {/each}
    </div>
</div>

<section id="table">
    {#each cosmetics as item}
        { #if searchQuery.trim() == "" || item.name.toLowerCase().includes(searchQuery.trim()) }
        { #if filters.class.length == 0 || filters.class.some(i => item.class.includes(i)) }
        { #if filters.grade.length == 0 || filters.grade.some(i => item.grade.includes(i)) }
            <div class="item-wrapper" id="{item.name}">
                <a href={item.wiki}>
                    <img alt="{item.name}" class="item-image" src="{item.src}">
                </a>
                <div class="underline" style="background-color:{item.color}"></div>
            </div>
        {/if}
        {/if}
        {/if}
    {/each}
</section>

<style lang="scss">
    $background: #1A1411;
    $foreground: #342E29;

    :global(body) {
        margin: 0;
        background-color: $background;
    }

    #wrapper-filters {
        max-width: 1000px;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        box-sizing: border-box;
    }

    #wrapper-filters * {
        font-family: "tf2build";
    }

    #searchbar {
        color: lightgray;
        background-color: $foreground;
    }

    #date-released-button {
        border-width: 3px;
    }

    .class-filter-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .class-filter-wrapper .checkbox-wrapper {
        padding-right: 1.5rem;
    }

    .class-filter-wrapper .checkbox-wrapper > * {
        vertical-align: middle;
    }

    .class-filter-wrapper label {
        font-family: "tf2build";
        color: white;
    }




	#table {
        display: grid;
        grid-template-columns: repeat(auto-fill, 100px);
        grid-gap: 1rem;
        justify-content: center;
        padding: 1rem;
        padding-bottom: 2rem;
        box-sizing: border-box;
    }

    .item-wrapper {
        background-color: $foreground;
    }
    .item-image {
        height: 100px;
        display: block;
    }
    .underline {
        height: 3px;
    }
</style>
