<script lang="ts">
    import cosmeticsJSON from "$lib/cosmetics.json";
    import gradeColors from "$lib/gradeColors.json";
    import "$lib/tf2build.css";

    let searchQuery: string = "";
</script>

<svelte:head>
    <title>TF2 Cosmetics</title>
</svelte:head>

<div class="filters-wrapper">
    <input bind:value={searchQuery} type="text" id="searchbar" placeholder="Search for items..">
</div>

<section id="table">
    {#each cosmeticsJSON as item}
        { #if searchQuery.trim() == "" || item.name.toLowerCase().includes(searchQuery.trim()) }
            <div class="item-wrapper" id="{item.name}">
                <img alt="{item.name}" class="item-image" src="{item.src}">
                <div class="underline" style="background-color:{gradeColors[item.grade]}"></div>
            </div>
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

    .filters-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem 2rem;
        box-sizing: border-box;
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
