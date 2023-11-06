<script lang="ts">
    import cosmeticsJSON from "$lib/cosmetics.json";
    import gradeColors from "$lib/gradeColors.json";
    import "$lib/tf2build.css";
</script>

<svelte:head>
    <title>TF2 Cosmetics</title>
</svelte:head>

<section id="table">
    {#each cosmeticsJSON as item}
            <div class="item-wrapper" id="{item.name}">
                <img alt="{item.name}" class="item-image" src="{item.src}">
                <div class="underline" style="background-color:{gradeColors[item.grade]}"></div>
            </div>
    {/each}
</section>

<style lang="scss">
    $background: #1A1411;
    $foreground: #342E29;

    :global(html) {
        background-color: $background;
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
