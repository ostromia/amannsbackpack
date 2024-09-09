<script lang="ts">
    import { onMount } from 'svelte';

    import cosmeticsJSON from "$lib/cosmetics.json";
    import classes from "$lib/classes.json";
    import grades from "$lib/grades.json";

    import "$lib/tf2build.css";

    let searchQuery: string = "";

    function sortCosmeticsChronologically(cosmeticsJSON: any) {
        let cosmetics = cosmeticsJSON;

        // convert date into epoch timestamp
        for (let i = 0; i < cosmetics.length; i++) {
            let item = cosmetics[i];
            const d = new Date(item.date.toString().replace(" Patch", ""));
            item.date = d.getTime();
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

    let cosmetics = sortCosmeticsChronologically(cosmeticsJSON);

    onMount(async () => {
        const px = 1;
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

        function resizeFiltersWrapper() {
            const columnCount = window
                .getComputedStyle(document.getElementById("table")!)
                .getPropertyValue('grid-template-columns').split(' ').length;
            const width = (100 * px * columnCount + 1) + (rem * (columnCount - 1));

            document.getElementById("wrapper-searchbar")!.style.width = `${width}px`;
            document.getElementById("wrapper-filters")!.style.width = `${width}px`;
        }

        addEventListener("resize", (event) => {
            resizeFiltersWrapper();
        });

        resizeFiltersWrapper();
  })

  let showClassFilter = false;
  let showGradeFilter = false;

    let filters = {
        class: [],
        grade: []
    }
</script>


<div id="warning" style="text-align: center; font-family: sans-serif; color: black; background-color: darkgoldenrod">
    this webpage is a work in progress and currently doesn't work as intended - please submit a <a href="https://github.com/berkay-yalin/tf2/pulls" target="_blank">pull request</a> if you would like to contribute to development
</div>

<div id="wrapper-searchbar">
    <input bind:value={searchQuery} type="text" id="searchbar" placeholder="Search for items..">
</div>

<div id="wrapper-filters">
    <div class="wrapper-filter">
        <button on:click={() => {showClassFilter = !showClassFilter}}>
            Class
        </button>

        {#if showClassFilter}
            <div class="wrapper-filter-checkboxes">
                {#each classes as name}
                        <label for={name}>{name}</label>
                        <input type="checkbox" id={name} name={name} value={name} bind:group={filters.class}>
                {/each}
            </div>
        {/if}
    </div>

    <div class="wrapper-filter">
        <button on:click={() => {showGradeFilter = !showGradeFilter}}>
            Grade
        </button>

        {#if showGradeFilter}
            <div class="wrapper-filter-checkboxes">
                {#each grades as name}
                        <label for={name}>{name}</label>
                        <input type="checkbox" id={name} name={name} value={name} bind:group={filters.grade}>
                {/each}
            </div>
        {/if}
    </div>
</div>

<section id="table">
    {#each cosmetics as item}
        { #if searchQuery.trim() == "" || item.name.toLowerCase().includes(searchQuery.trim()) }
        { #if filters.class.length == 0 || filters.class.some(i => item.class.includes(i)) }
        { #if filters.grade.length == 0 || filters.grade.includes(item.grade) }
            <div class="item-wrapper" id="{item.name}">
                <a href={item.url}>
                    <img alt="{item.name}" class="item-image" src="{item.src}">
                </a>
                <div class="underline" style="background-color:{item.gradeColor}"></div>
            </div>
        {/if}
        {/if}
        {/if}
    {/each}
</section>

<style lang="scss">
    $background: #1A1411;
    $foreground: #342E29;

    $max-width: calc(100px * 10 + 1rem * 10 + 1rem);

    :global(body) {
        margin: 0;
        background-color: $background;
    }

    #wrapper-searchbar {
        max-width: calc(100px * 10 + 1rem * 10);
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 0;
        box-sizing: border-box;

        > * {
            font-family: "tf2build";
        }
    }

    #wrapper-filters {
        max-width: calc(100px * 10 + 1rem * 10);
        margin: auto;
        display: flex;
        gap: 1rem;

        > * {
            font-family: "tf2build";
        }
    }


    .wrapper-filter {
        > button {
            color: lightgray;
            background-color: $foreground;
            margin-bottom: 0.5rem;
        }

        color: lightgray;

        > * {
            font-family: "tf2build";
        }
    }

    .wrapper-filter-checkboxes {
        display: grid;
        grid-template-columns: 100px min-content;

        > label {
            color: lightgrey;
        }

    }

    .wrapper-filter-checkboxes > * :nth-child(2n-1) {
        grid-column: 1;
    }

    .wrapper-filter-checkboxes > * :nth-child(2n) {
        grid-column: 2;
    }

    #searchbar {
        color: lightgray;
        background-color: $foreground;
    }

	#table {
        max-width: $max-width;
        margin: auto;
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