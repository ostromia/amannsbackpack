<!-- @migration-task Error while migrating Svelte code: Expected a `#` character immediately following the opening bracket -->
<script lang="ts">
    import ButtonIcon from "$lib/components/ButtonIcon.svelte";

    import cosmeticsJSON from "$lib/cosmetics.json";

    import "$lib/tf2build.css";

    import scout_icon from "$lib/class-icons/Leaderboard_class_scout.png";
    import soldier_icon from "$lib/class-icons/Leaderboard_class_soldier.png";
    import pyro_icon from "$lib/class-icons/Leaderboard_class_pyro.png";
    import demoman_icon from "$lib/class-icons/Leaderboard_class_demoman.png";
    import heavy_icon from "$lib/class-icons/Leaderboard_class_heavy.png";
    import engineer_icon from "$lib/class-icons/Leaderboard_class_engineer.png";
    import medic_icon from "$lib/class-icons/Leaderboard_class_medic.png";
    import sniper_icon from "$lib/class-icons/Leaderboard_class_sniper.png";
    import spy_icon from "$lib/class-icons/Leaderboard_class_spy.png";

    let searchQuery: string = $state("");

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

    let filters = $state({
        class: [],
        grade: []
    })
</script>

<div style="text-align: center; font-family: sans-serif; color: black; background-color: darkgoldenrod; padding: 0.25rem; box-sizing: border-box; margin-bottom: 1rem;">
    this webpage is a work in progress and currently doesn't work as intended - please submit a <a href="https://github.com/berkay-yalin/tf2/pulls" target="_blank">pull request</a> if you would like to contribute to development
</div>

<div id="wrapper-filters">
    <input id="searchbar" bind:value={searchQuery} type="text" placeholder="Search for items..">

    <div id="wrapper-filters-buttons">
        <div class="wrapper-filter">
            <ButtonIcon><label for="Scout"><img alt="" src={scout_icon}/></label></ButtonIcon>
            <ButtonIcon><label for="Soldier"><img alt="" src={soldier_icon}/></label></ButtonIcon>
            <ButtonIcon><label for="Pyro"><img alt="" src={pyro_icon}/></label></ButtonIcon>
            <ButtonIcon><label for="Demoman"><img alt="" src={demoman_icon}/></label></ButtonIcon>
            <ButtonIcon><label for="Heavy"><img alt="" src={heavy_icon}/></label></ButtonIcon>
            <ButtonIcon><label for="Engineer"><img alt="" src={engineer_icon}/></label></ButtonIcon>
            <ButtonIcon><label for="Medic"><img alt="" src={medic_icon}/></label></ButtonIcon>
            <ButtonIcon><label for="Sniper"><img alt="" src={sniper_icon}/></label></ButtonIcon>
            <ButtonIcon><label for="Spy"><img alt="" src={spy_icon}/></label></ButtonIcon>
        </div>

        <div class="wrapper-filter">
            <ButtonIcon><label for="Unique"><span class="dot" style="background-color:#FFD700"></span></label></ButtonIcon>
            <ButtonIcon><label for="Genuine"><span class="dot" style="background-color:#4D7455"></span></ButtonIcon>
            <ButtonIcon><label for="Mercenary"><span class="dot" style="background-color:#4B69FF"></ButtonIcon>
            <ButtonIcon><label for="Commando"><span class="dot" style="background-color:#8847FF"></ButtonIcon>
            <ButtonIcon><label for="Assassin"><span class="dot" style="background-color:#D32CE6"></ButtonIcon>
            <ButtonIcon><label for="Elite"><span class="dot" style="background-color:#EB4B4B"></ButtonIcon>
        </div>
    </div>
</div>

<div style="display: none">
    <input type="checkbox" id="Scout" name="Scout" value="Scout" bind:group={filters.class}>
    <input type="checkbox" id="Soldier" name="Soldier" value="Soldier" bind:group={filters.class}>
    <input type="checkbox" id="Pyro" name="Pyro" value="Pyro" bind:group={filters.class}>
    <input type="checkbox" id="Demoman" name="Demoman" value="Demoman" bind:group={filters.class}>
    <input type="checkbox" id="Heavy" name="Heavy" value="Heavy" bind:group={filters.class}>
    <input type="checkbox" id="Engineer" name="Engineer" value="Engineer" bind:group={filters.class}>
    <input type="checkbox" id="Medic" name="Medic" value="Medic" bind:group={filters.class}>
    <input type="checkbox" id="Sniper" name="Sniper" value="Sniper" bind:group={filters.class}>
    <input type="checkbox" id="Spy" name="Spy" value="Spy" bind:group={filters.class}>

    <input type="checkbox" id="Unique" name="Unique" value="Unique" bind:group={filters.grade}>
    <input type="checkbox" id="Genuine" name="Genuine" value="Genuine" bind:group={filters.grade}>
    <input type="checkbox" id="Mercenary" name="Mercenary" value="Mercenary" bind:group={filters.grade}>
    <input type="checkbox" id="Commando" name="Commando" value="Commando" bind:group={filters.grade}>
    <input type="checkbox" id="Assassin" name="Assassin" value="Assassin" bind:group={filters.grade}>
    <input type="checkbox" id="Elite" name="Elite" value="Elite" bind:group={filters.grade}>
</div>

<section id="table">
    {#each cosmetics as item}
        {#if searchQuery.trim() == "" || item.name.toLowerCase().includes(searchQuery.trim()) }
        {#if filters.class.length == 0 || filters.class.some(i => item.class.includes(i)) }
        {#if filters.grade.length == 0 || filters.grade.includes(item.grade) }
            <div class="item-wrapper" id="{item.name}">
                <a href={item.url}>
                    <img alt="{item.name}" class="item-image" src="cosmetics/{item.name.replace("?", "").replace("%", "")}.png">
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

    :global(body) {
        margin: 0;
        background-color: $background;
        font-family: system-ui, sans-serif;
    }

    #wrapper-filters {
        margin: auto;
        width: max-content;

        #searchbar {
            height: 1.5rem;
            color: lightgray;
            font-family: "tf2build", system-ui, sans-serif;
            background-color: $foreground;
            padding: 0.25rem;
            box-sizing: border-box;
            text-align: center;
        }

        label {
            height: 20px;
            width: 20px;
        }

        img {
            height: 100%;
            width: 100%;
        }

        .dot {
            height: calc(100% - 4px);
            width: calc(100% - 4px);
            border-radius: 50%;
            display: inline-block;
            margin: 2px;
        }
    }

    @media(max-width: 596px) {
        #wrapper-filters {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        #wrapper-filters-buttons {
            display: contents !important;
        }

        #searchbar {
            margin-bottom: 0px;
        }

        .wrapper-filter {
            display: block !important;
            grid-column: span 2;
        }
    }

    @media(min-width: 596px) {
        #wrapper-filters {
            display: grid;
        }

        #wrapper-filters-buttons {
            display: flex;
            justify-content: space-between;
            gap: 5px;
        }

        #searchbar {
            grid-column: span 2;
            margin-bottom: 10px;
        }

        .wrapper-filter {
            display: contents;
        }
    }

	#table {
        max-width: calc(100px * 10 + 1rem * 10 + 1rem);
        margin: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, 100px);
        grid-gap: 1rem;
        justify-content: center;
        padding: 1rem;
        padding-bottom: 2rem;
        box-sizing: border-box;

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
    }
</style>

