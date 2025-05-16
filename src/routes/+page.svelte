<script lang="ts">
    import class_icons from "$lib/class-icons";
    import ButtonIcon from "$lib/components/ButtonIcon.svelte";
    import cosmeticsJSON from "$lib/cosmetics.json";
    import "$lib/tf2build.css";

    import "../app.scss";

    let searchQuery: string = $state("");

    let cosmetics = cosmeticsJSON.sort((a, b) => {
        const dateA = new Date(a.update[0].replace(" Patch", "")).getTime();
        const dateB = new Date(b.update[0].replace(" Patch", "")).getTime();
        return dateA - dateB;
    });

    let filters = $state({
        class: [],
        grade: []
    });
</script>

<div id="wrapper-filters">
    <input id="searchbar" bind:value={searchQuery} type="text" placeholder="Search for items.." />

    <div class="wrapper-filter">
        <ButtonIcon><label for="Scout"><img alt="" src={class_icons.scout} /></label></ButtonIcon>
        <ButtonIcon><label for="Soldier"><img alt="" src={class_icons.soldier} /></label></ButtonIcon>
        <ButtonIcon><label for="Pyro"><img alt="" src={class_icons.pyro} /></label></ButtonIcon>
        <ButtonIcon><label for="Demoman"><img alt="" src={class_icons.demoman} /></label></ButtonIcon>
        <ButtonIcon><label for="Heavy"><img alt="" src={class_icons.heavy} /></label></ButtonIcon>
        <ButtonIcon><label for="Engineer"><img alt="" src={class_icons.engineer} /></label></ButtonIcon>
        <ButtonIcon><label for="Medic"><img alt="" src={class_icons.medic} /></label></ButtonIcon>
        <ButtonIcon><label for="Sniper"><img alt="" src={class_icons.sniper} /></label></ButtonIcon>
        <ButtonIcon><label for="Spy"><img alt="" src={class_icons.spy} /></label></ButtonIcon>
    </div>

    <div class="wrapper-filter">
        <ButtonIcon><label for="Unique"><span class="dot" style="background-color:#FFD700"></span></label></ButtonIcon>
        <ButtonIcon><label for="Genuine"><span class="dot" style="background-color:#4D7455"></span></label></ButtonIcon>
        <ButtonIcon><label for="Mercenary"><span class="dot" style="background-color:#4B69FF"></span></label></ButtonIcon>
        <ButtonIcon><label for="Commando"><span class="dot" style="background-color:#8847FF"></span></label></ButtonIcon>
        <ButtonIcon><label for="Assassin"><span class="dot" style="background-color:#D32CE6"></span></label></ButtonIcon>
        <ButtonIcon><label for="Elite"><span class="dot" style="background-color:#EB4B4B"></span></label></ButtonIcon>
    </div>
</div>

<div style="display: none">
    <input type="checkbox" id="Scout" name="Scout" value="Scout" bind:group={filters.class} />
    <input type="checkbox" id="Soldier" name="Soldier" value="Soldier" bind:group={filters.class} />
    <input type="checkbox" id="Pyro" name="Pyro" value="Pyro" bind:group={filters.class} />
    <input type="checkbox" id="Demoman" name="Demoman" value="Demoman" bind:group={filters.class} />
    <input type="checkbox" id="Heavy" name="Heavy" value="Heavy" bind:group={filters.class} />
    <input type="checkbox" id="Engineer" name="Engineer" value="Engineer" bind:group={filters.class} />
    <input type="checkbox" id="Medic" name="Medic" value="Medic" bind:group={filters.class} />
    <input type="checkbox" id="Sniper" name="Sniper" value="Sniper" bind:group={filters.class} />
    <input type="checkbox" id="Spy" name="Spy" value="Spy" bind:group={filters.class} />

    <input type="checkbox" id="Unique" name="Unique" value="Unique" bind:group={filters.grade} />
    <input type="checkbox" id="Genuine" name="Genuine" value="Genuine" bind:group={filters.grade} />
    <input type="checkbox" id="Mercenary" name="Mercenary" value="Mercenary" bind:group={filters.grade} />
    <input type="checkbox" id="Commando" name="Commando" value="Commando" bind:group={filters.grade} />
    <input type="checkbox" id="Assassin" name="Assassin" value="Assassin" bind:group={filters.grade} />
    <input type="checkbox" id="Elite" name="Elite" value="Elite" bind:group={filters.grade} />
</div>

<section id="table">
    {#each cosmetics as item}
        <div
            class="item-wrapper"
            id={item.name}
            style="
                display: {(searchQuery.trim() === '' || item.name.toLowerCase().includes(searchQuery.trim())) &&
            (filters.class.length === 0 || filters.class.some((i) => item.class.includes(i))) &&
            (filters.grade.length === 0 || filters.grade.includes(item.grade))
                ? 'block'
                : 'none'}"
        >
            <a href={item.url}>
                <img alt={item.name} class="item-image" src={"cosmetics/" + item.name.replace("?", "").replace("%", "") + ".png"} />
            </a>
            <div class="underline" style={"background-color:" + item.gradeColor}></div>
        </div>
    {/each}
</section>
