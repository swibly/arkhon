<script lang="ts">
    export let users: { name: string; pfp: string }[];
    export let limit: number = 5;

    let overflow = users.length - limit;
</script>

<div class="-space-x-4 avatar-group overflow-visible">
    {#if overflow > 0}
        <div class="avatar placeholder hover:z-50 hover:border-4 hover:border-base-100">
            <div class="bg-neutral text-neutral-content w-10">
                <span class="text-xs">+{overflow}</span>
            </div>
        </div>
    {/if}

    {#each users.slice(0, limit) as user}
        <div class="tooltip tooltip-secondary text-xs size-12" data-tip="@{user.name}">
            <div class="avatar transition size-12 hover:z-50 hover:scale-110 hover:border-4 hover:border-base-100">
                <a href={`/profile/${user.name}`} class="w-full">
                    <img src={user.pfp} alt="" />
                </a>
            </div>
        </div>
    {/each}
</div>
