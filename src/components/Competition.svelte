<script lang="ts">
    import { storage } from "$lib/database";
    import { DownloadIcon } from "@lucide/svelte";
    import { ref, uploadBytes } from "firebase/storage";
    import { computeHash } from "$lib/crypto";
    // @ts-ignore
    import Markdown from "svelte-exmarkdown";
    // @ts-ignore
    import { gfmPlugin } from "svelte-exmarkdown/gfm";

    const plugins = [gfmPlugin()];
    let {
        triggerCard = $bindable(),
        token,
        nickname,
        progress,
        challenge
    }: {
        triggerCard: any;
        token: string;
        nickname: string;
        progress: {
            section: number;
            task: number;
        };
        challenge: {
            title: string;
            id: number;
            parts: {
                context: string;
                description: string;
                hint?: string;
                requires: { [key: string]: "number" | "file" | "text" };
            }[];
            materials: { json?: string; xlsx?: string; csv?: string; sb3?: string };
        };
    } = $props();

    let inputValue: { [key: string]: any } = $state({});
</script>

<div class="flex w-full flex-col">
    <div
        class="flex flex-row items-center justify-between border-b border-b-accent px-6 py-3 sm:px-12"
    >
        <p>Bạn đang tham gia bằng tên <code>{nickname}</code>.</p>
        <button
            class="text-accent"
            onclick={() => {
                triggerCard();
            }}>Xem thẻ thông tin</button
        >
    </div>
    <div class="flex w-full flex-col lg:flex-row">
        <div class="prose min-w-screen p-6 text-justify prose-invert sm:p-12 lg:min-w-0">
            <h1>{challenge.title}</h1>
            <a href="#yeucau" class="text-accent">Nhảy tới yêu cầu</a>
            <h2>Tải xuống đề bài</h2>
            <div class="flex flex-row flex-wrap">
                {#each Object.entries(challenge.materials) as [format, link]}
                    <a href={link} class="btn"
                        ><DownloadIcon size={20} /><span class="px-2">.{format}</span></a
                    >
                {/each}
            </div>
            {#each challenge.parts as part, i}
                {#if i <= progress.section}
                    <Markdown md={part.context} {plugins} />
                    <h2 id={i == progress.section ? "yeucau" : ""}>
                        Yêu cầu {i == progress.section ? "" : "(ý trước)"}
                    </h2>
                    <Markdown md={part.description} {plugins} />
                {/if}
            {/each}
        </div>
        <div
            class="prose flex min-w-screen flex-col border-t border-t-accent lg:border-t-0 lg:border-l lg:border-l-accent p-6 prose-invert sm:p-12 lg:min-w-0"
        >
            <h1>Chim sẻ</h1>
            <form
                class="flex w-fit flex-col gap-3"
                onsubmit={async () => {
                    Object.entries(inputValue).forEach(async ([label, value]) => {
                        if (challenge.parts[progress.section].requires[label] == "file") {
                            console.log("submitting");
                            await uploadBytes(
                                ref(
                                    storage,
                                    `userUploads/${progress.task}.${progress.section}.${computeHash(token)}.${value[0].name.split(".").pop()}`
                                ),
                                value[0]
                            );
                        }
                    });
                }}
            >
                {#each Object.entries(challenge.parts[progress.section].requires) as [name, type]}
                    <div>
                        {#if type == "file"}
                            <h3>{name} (bấm để chọn file):</h3>
                        {/if}
                        {#if type == "file"}
                            <input
                                class="depth border border-accent bg-bg"
                                type="file"
                                bind:files={inputValue[name]}
                            />
                        {:else}
                            <input
                                class="depth border border-accent bg-bg"
                                {type}
                                bind:value={inputValue[name]}
                            />
                        {/if}
                    </div>
                {/each}
                <input type="submit" class="btn" value="Gửi" />
            </form>
        </div>
    </div>
</div>
