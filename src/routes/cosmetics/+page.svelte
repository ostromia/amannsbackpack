<script lang="ts">
    import cosmeticsJSON from "$lib/cosmetics.json";
    import gradeColors from "$lib/gradeColors.json";
    import "$lib/tf2build.css";

    let searchQuery: string = "";

    let filter_class = {
        "scout": false,
        "soldier": false,
        "pyro": false,
        "demoman": false,
        "heavy": false,
        "engineer": false,
        "medic": false,
        "spy": false,
        "sniper": false
    }

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

    let _filters = {
        class: []
    };

    function onChange(classes) {
        // add selected classes to _filters.class
        _filters.class = [];
        for (const [key, value] of Object.entries(filter_class)) {
            if (value == true) {
                _filters.class.push( key.charAt(0).toUpperCase() + key.slice(1) );
            }
        }
    }

    let dateReleased: HTMLButtonElement;
    function dR_B() {
        cosmetics = cosmetics.reverse();
        dateReleased.innerHTML = "Date Released " + (dateReleased.innerHTML.includes("(Newest)") ? "(Oldest)" : "(Newest)");
    }

    $: cosmetics
    $: onChange(filter_class)
</script>

<svelte:head>
    <title>TF2 Cosmetics</title>
</svelte:head>

<div class="filters-wrapper">
    <input bind:value={searchQuery} type="text" id="searchbar" placeholder="Search for items..">

    <button bind:this={dateReleased} type="button" id="date-released-button" on:click={dR_B}>
        Date Released (Oldest)
    </button>

    <div class="class-filter-wrapper">
        <div class="checkbox-wrapper">
            <label for="Scout">Scout</label>
            <input type="checkbox" id="Scout" name="Scout" bind:checked={filter_class.scout}>
        </div>

        <div class="checkbox-wrapper">
            <label for="Soldier">Soldier</label>
            <input type="checkbox" id="Soldier" name="Soldier" bind:checked={filter_class.soldier}>
        </div>

        <div class="checkbox-wrapper">
            <label for="Pyro">Pyro</label>
            <input type="checkbox" id="Pyro" name="Pyro" bind:checked={filter_class.pyro}>
        </div>

        <div class="checkbox-wrapper">
            <label for="Demoman">Demoman</label>
            <input type="checkbox" id="Demoman" name="Demoman" bind:checked={filter_class.demoman}>
        </div>

        <div class="checkbox-wrapper">
            <label for="Heavy">Heavy</label>
            <input type="checkbox" id="Heavy" name="Heavy" bind:checked={filter_class.heavy}>
        </div>

        <div class="checkbox-wrapper">
            <label for="Engineer">Engineer</label>
            <input type="checkbox" id="Engineer" name="Engineer" bind:checked={filter_class.engineer}>
        </div>

        <div class="checkbox-wrapper">
            <label for="Medic">Medic</label>
            <input type="checkbox" id="Medic" name="Medic" bind:checked={filter_class.medic}>
        </div>

        <div class="checkbox-wrapper">
            <label for="Spy">Spy</label>
            <input type="checkbox" id="Spy" name="Spy" bind:checked={filter_class.spy}>
        </div>

        <div class="checkbox-wrapper">
            <label for="Sniper">Sniper</label>
            <input type="checkbox" id="Sniper" name="Sniper" bind:checked={filter_class.sniper}>
        </div>
    </div>
</div>

<section id="table">
    {#each cosmetics as item}
        { #if searchQuery.trim() == "" || item.name.toLowerCase().includes(searchQuery.trim()) }
        { #if _filters.class.length == 0 || _filters.class.some(i => item.class.includes(i)) }
            <div class="item-wrapper" id="{item.name}">
                <img alt="{item.name}" class="item-image" src="{item.src}">
                <div class="underline" style="background-color:{gradeColors[item.grade]}"></div>
            </div>
        {/if}
        {/if}
    {/each}
</section>

<style lang="scss">
    $background: #1A1411;
    $foreground: #342E29;

    :global(html) {
        background-color: $background;
    }
    :global(body) {
        margin: 0;
    }

    #date-released-button {
        font-family: "tf2build";
        border-width: 3px;
    }

    .filters-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem;
        box-sizing: border-box;
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

    #searchbar {
        font-size: 1rem;
        font-family: "tf2build";
        color: lightgray;
        background-color: $foreground;
    }

	#table {
		display: flex;
        flex-wrap: wrap;
        justify-content: center;
		gap: 1rem;
    }

    .item-wrapper {
        background-color: $foreground;
    }
    .item-image {
        height: 100px;
        display: block;
        margin: auto;
    }
    .underline {
        height: 3px;
    }
</style>
