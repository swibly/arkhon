<script lang="ts">
    export let users: { name: string; pfp: string }[];
    export let limit: number = 5;

    let overflow = users.length - limit;
</script>

<div class="-space-x-4 avatar-group">
    {#if overflow > 0}
        <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content w-10 hover:z-50">
                <span class="text-xs">+{overflow}</span>
            </div>
        </div>
    {/if}

    {#each users.slice(0, limit) as user}
        <div class="avatar size-12">
            <a href={`/profile/${user.name}`} class="hover:z-50">
                <img src={user.pfp} alt="" />
            </a>
        </div>
    {/each}
</div>
