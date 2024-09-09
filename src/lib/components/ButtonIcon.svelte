<script>
    let isClicked = false;
</script>

<button on:click={() => { isClicked = !isClicked; }} style:background-color={isClicked ? '#342E29' : 'lightgray'}>
    <slot/>
</button>

<style>
    button {
        height: 30px;
        width: 30px;

        padding-block: 1px;
        padding-inline: 1px;
    }
</style>
