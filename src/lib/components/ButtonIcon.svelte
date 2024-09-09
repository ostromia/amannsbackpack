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

        /* display: flex;
        align-items: center;
        justify-content: center; */

        padding-block: 2px;
        padding-inline: 2px;
    }
</style>
