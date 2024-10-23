<script lang="ts">
    import { page } from '$app/stores';
    import ProfileTab from '$lib/components/settings-tabs/ProfileTab.svelte';
    import AccountTab from '$lib/components/settings-tabs/AccountTab.svelte';
    import PrivacyTab from '$lib/components/settings-tabs/PrivacyTab.svelte';
    import NotificationsTab from '$lib/components/settings-tabs/NotificationsTab.svelte';
    import SecurityTab from '$lib/components/settings-tabs/SecurityTab.svelte';
    import type { LayoutServerData } from './$types';

    $: tab = $page.url.searchParams.get('tab')!;

    export let data: LayoutServerData;

    $: user = data.user;
</script>

<svelte:head>
    <title>Configurações de {data.tabsProps[tab].name} - Swibly Arkhon</title>
</svelte:head>

{#if tab === 'profile'}
    <ProfileTab {user} />
{:else if tab === 'account'}
    <AccountTab {user} />
{:else if tab === 'privacy'}
    <PrivacyTab {user} />
{:else if tab === 'notifications'}
    <NotificationsTab {user} />
{:else if tab === 'security'}
    <SecurityTab {user} />
{/if}
