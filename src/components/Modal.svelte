<script lang="ts">
    let { showModal = $bindable(), children } = $props();

    let dialog: HTMLDialogElement = $state()!; // HTMLDialogElement

    $effect(() => {
        if (showModal) dialog.showModal();
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
    class="depth"
    bind:this={dialog}
    onclose={() => (showModal = false)}
    onclick={(e) => {
        if (e.target === dialog) dialog.close();
    }}
>
    <div class="w-full">
        {@render children?.()}
        <!-- svelte-ignore a11y_autofocus -->
        <div class="flex w-full flex-row justify-end">
            <button onclick={() => dialog.close()} class="btn">Đóng</button>
        </div>
    </div>
</dialog>

<style>
    dialog {
        transform: translateX(calc(-50% + 50vw)) translateY(calc(-50% + 50vh));
        border-radius: 0;
        border: none;
        padding: 0;
        background-color: var(--color-bg);
        color: var(--fg2);
        border: solid 1px var(--color-fg3);
        max-width: 32rem;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    button {
        display: block;
    }
</style>
