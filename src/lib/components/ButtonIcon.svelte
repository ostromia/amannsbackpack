<script lang="ts">
    interface Props {
        children?: import("svelte").Snippet;
    }

    let { children }: Props = $props();
    let isClicked = $state(false);
</script>

<button
    onclick={() => {
        isClicked = !isClicked;
    }}
    style:background-color={isClicked ? "#342E29" : "lightgray"}
>
    {@render children?.()}
</button>

<style>
    button {
        height: 30px;
        width: 30px;

        /* display: flex;
        align-items: center;
        justify-content: center; */

        padding-block: 2px;
        padding-inline: 2px;
    }
</style>
