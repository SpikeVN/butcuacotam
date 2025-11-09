<script lang="ts">
    import { db, storage } from "$lib/database";
    import { DownloadIcon } from "@lucide/svelte";
    import { ref, uploadBytes } from "firebase/storage";
    import { computeHash } from "$lib/crypto";
    import { doc, setDoc, updateDoc } from "firebase/firestore/lite";
    // @ts-ignore
    import Markdown from "svelte-exmarkdown";
    // @ts-ignore
    import { gfmPlugin } from "svelte-exmarkdown/gfm";

    const plugins = [gfmPlugin()];
    let {
        tokenHashed,
        nickname,
        progress,
        challenge
    }: {
        tokenHashed: string;
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
    let showHint = $state(false);
    // @ts-ignore
    let submitButton: HTMLInputElement = $state();

    console.log(progress, challenge);
</script>

<div class="flex h-full w-full flex-col">
    <div
        class="noise flex flex-row items-center justify-between border-b border-b-accent px-6 py-3 sm:px-12 lg:fixed lg:right-0 lg:left-0 lg:backdrop-blur-2xl"
    >
        <p>Bạn đang tham gia bằng tên <code>{nickname}</code>.</p>
        <button
            class="cursor-pointer text-accent"
            onclick={() => {
                window.localStorage.removeItem("tokenHashed");
                window.localStorage.removeItem("nickname");
                window.localStorage.removeItem("progress");
                window.location.reload();
            }}>Đăng xuất</button
        >
    </div>
    <div class="flex h-full max-h-full w-full flex-col lg:flex-row">
        <div
            class="prose min-w-screen p-6 text-justify prose-invert sm:p-12 lg:h-full lg:min-w-[70%]"
        >
            <br class="hidden lg:block" />
            <h1>{challenge.title}</h1>
            <a href="#yeucau" class="text-accent">Nhảy tới yêu cầu</a>
            {#each challenge.parts as part, i}
                {#if i <= progress.section}
                    <Markdown md={part.context} {plugins} />
                    <h2 id={i == progress.section ? "yeucau" : ""}>
                        Yêu cầu {i == progress.section ? "" : "(ý trước)"}
                    </h2>
                    <Markdown md={part.description} {plugins} />
                    {#if part.hint !== undefined}
                        <div
                            class:flex-row={!showHint}
                            class:flex-col={showHint}
                            class="flex items-start gap-2"
                        >
                            <strong>Gợi ý của Bụt (chỉ mở ra nếu bạn bí):</strong>
                            <button
                                class:text-accent={!showHint}
                                class:text-fg3={showHint}
                                class="text-left"
                                onclick={() => {
                                    showHint = !showHint;
                                }}
                                >{#if showHint}
                                    <Markdown
                                        md={part.hint !== undefined ? part.hint : ""}
                                        {plugins}
                                    />
                                {:else}
                                    Bấm để mở gợi ý
                                {/if}</button
                            >
                        </div>
                    {/if}
                    <!-- <Markdown md={`**Gợi ý của Bụt (chỉ mở ra nếu bạn bí):** ||${part.hint}||`} {plugins} /> -->
                {/if}
            {/each}
            <h2>Tải xuống đề bài {progress.section != 0 ? "ban đầu" : ""}</h2>
            {#if progress.section != 0}
                <p>
                    Dù đề bài gốc vẫn không có gì thay đổi, bạn vẫn có thể tiếp tục tải nó xuống tại
                    đây. Lưu ý rằng có thể bài sẽ yêu cầu sử dụng dữ liệu từ ý trước
                </p>
            {/if}
            <div class="flex flex-row flex-wrap">
                {#each Object.entries(challenge.materials) as [format, link]}
                    <a href={link} class="btn"
                        ><DownloadIcon size={20} /><span class="px-2">.{format}</span></a
                    >
                {/each}
            </div>
            <p class="text-sm text-fg3">
                Bản quyền © 2025 CLB Khoa học Công nghệ trong Kinh tế và Kinh doanh trường Đại học
                Ngoại Thương. Chúng tôi giữ toàn quyền. Sao lưu, phân phối nội dung trong trang web
                này phải ghi rõ nguồn.
            </p>
        </div>
        <div
            class="top-23 right-0 bottom-0 prose flex min-w-screen translate-y-11 flex-col border-t border-t-accent p-6 prose-invert sm:p-12 lg:fixed lg:w-[30%] lg:min-w-0 lg:border-t-0 lg:border-l lg:border-l-accent"
        >
            <h1>Giúp cô Tấm</h1>
            {#if progress.section < challenge.parts.length}
                <form
                    class="flex w-fit flex-col gap-3"
                    onsubmit={async () => {
                        submitButton.disabled = true;
                        inputValue = {};
                        setTimeout(() => {
                            submitButton.disabled = false;
                        }, 1000);
                        Object.entries(inputValue).forEach(async ([label, value]) => {
                            let reqType = challenge.parts[progress.section].requires[label];
                            if (reqType == "file") {
                                console.log("submitting");
                                let filename = `userUploads/${progress.task}.${progress.section}.${computeHash(tokenHashed)}.${value[0].name.split(".").pop()}`;
                                await uploadBytes(ref(storage, filename), value[0]);
                                try {
                                    await updateDoc(doc(db, "answers", tokenHashed), {
                                        [progress.task]: {
                                            [progress.section]: {
                                                [label]: {
                                                    type: "file",
                                                    value: JSON.stringify(filename)
                                                }
                                            }
                                        }
                                    });
                                } catch (e) {
                                    await setDoc(doc(db, "answers", tokenHashed), {
                                        0: {
                                            0: {
                                                [label]: {
                                                    type: "file",
                                                    value: JSON.stringify(filename)
                                                }
                                            }
                                        }
                                    });
                                }
                            } else {
                                try {
                                    await updateDoc(doc(db, "answers", tokenHashed), {
                                        [progress.task]: {
                                            [progress.section]: {
                                                [label]: {
                                                    type: reqType,
                                                    value: JSON.stringify(value[0])
                                                }
                                            }
                                        }
                                    });
                                } catch (e) {
                                    await setDoc(doc(db, "answers", tokenHashed), {
                                        0: {
                                            0: {
                                                [label]: {
                                                    type: "file",
                                                    value: JSON.stringify(value[0])
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                            if (progress.section < challenge.parts.length) {
                                await updateDoc(doc(db, "users", tokenHashed), {
                                    progress: {
                                        section: progress.section + 1
                                    }
                                });
                                progress.section += 1;
                                window.localStorage.setItem("progress", JSON.stringify(progress));
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
                    <input type="submit" class="btn" value="Gửi" bind:this={submitButton} />
                </form>
            {:else}
                <p>Bạn đã hoàn thành thử thách này.</p>
            {/if}
        </div>
    </div>
</div>
