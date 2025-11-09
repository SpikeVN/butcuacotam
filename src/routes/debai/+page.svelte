<script lang="ts">
    import Navbar from "../../components/Navbar.svelte";
    import { db } from "$lib/database";
    import { generateToken, computeHash, toAlnumToken, toTextToken, getIfExist } from "$lib/crypto";
    import { collection, doc, setDoc } from "firebase/firestore/lite";
    import { onMount } from "svelte";
    import { qr } from "@svelte-put/qr/svg";
    import Competition from "../../components/Competition.svelte";
    import Modal from "../../components/Modal.svelte";
    import { page } from "$app/state";
    import logo from "$lib/assets/logo-large.png";
    import Footer from "../../components/Footer.svelte";
    import { ArrowRightIcon } from "@lucide/svelte";

    let challenge: {
        title: string;
        id: number;
        parts: {
            context: string;
            description: string;
            hint?: string;
            requires: { [key: string]: "number" | "file" | "text" };
        }[];
        materials: { json?: string; xlsx?: string; csv?: string; sb3?: string };
    } = {
        id: 0,
        title: "Cửa thứ 1. Cô Tấm, gạo, và cám",
        parts: [
            {
                context: `Ngày xửa ngày xưa, có hai chị em cùng cha khác mẹ tên là Tấm và Cám. Tấm phải sống chung với dì ghẻ là mẹ của Cám. Bà mẹ ghẻ là người cay nghiệt, hàng ngày bắt Tấm phải làm hết mọi công việc trong nhà còn Cám thì ngược lại được lêu lổng vui chơi tối ngày.

Ít lâu sau CLB CTE tổ chức cuộc thi Data Science Talent Competition, mọi người ai nấy nô nức tham gia. Mẹ con Cám chuẩn bị đi từ rất sớm, Tấm xin mẹ cho đi xem cùng thì dì ghẻ trộn dữ liệu gạo – thóc của các vùng trong 6 tháng cuối năm 2025 rồi bắt Tấm ngồi xử lý, khi nào xử lý xong thì mới được đi DSTC. Nhìn bảng dữ liệu dài 100 dòng, toàn số và ký hiệu rối tung, Tấm lại khóc nức nở.

Đúng lúc ấy, ông Bụt xuất hiện, phất tay một cái và gọi con chim thông minh tới giúp. Chim đeo tai nghe Bluetooth, vừa kêu "chíp chíp" vừa gõ phím thành thạo:

> Để em xử lý data cho chị, 3 phút là xong!

Bạn sẽ là chú chim ấy, nhiệm vụ của bạn là giúp Tấm vượt qua được những thử thách của mụ dì ghẻ để đến được DSTC 2026 nhé!
`,
                description: `Hãy nhận gạo và thóc mà dì ghẻ giao cho cô Tấm được cho ở dưới đây để giúp Tấm.

Bạn sẽ phải:
- Chuẩn hóa định dạng cột 
- Ngày thu hoạch về dạng yyyy-MM-dd. 
- Chuẩn hóa dữ liệu văn bản trong các cột: Khu vực, Tỉnh/Thành phố, Loại hạt. 
- Quy đổi giá USD về VND theo tỉ giá 1 USD = 25,000 VND. Xử lý các giá trị sai định dạng (ví dụ: ??, NA, USD20000, -100, #N/A …). 
- Loại bỏ các dòng trùng lặp (nếu có). Kiểm tra tổng số dòng sau khi làm sạch và ghi lại kết quả. 
`,
                hint: "Bạn có thể sử dụng các hàm `SUBSTITUTE`, `VALUE`, `TEXT`, `TRIM` hoặc tính năng Find & Replace, Remove Duplicates.",
                requires: { "Dữ liệu đã làm sạch": "file" }
            },
            {
                context:
                    "Với sự trợ giúp của những chú chim, Tấm đã nhanh chóng vượt qua được thử thách của mụ dì ghẻ. Nhặt lại quai hàm từ dưới đất lên (chắc tại do vừa rơi xuống) và uốn lại miệng từ chữ O thành dấu `(`. Mụ ta dù biết Tấm đã làm xong, vẫn đòi Tấm cho mụ xem biểu đồ, chứ không xem dữ liệu đã được làm sạch của Tấm. ",
                description: `Hãy sử dụng dữ liệu đã được làm sạch từ phần trước của bạn để:
- Tạo PivotTable tổng hợp Sản lượng (kg) theo từng Tỉnh/Thành phố. . 
- Tạo biểu đồ tròn (Pie Chart) thể hiện tỷ lệ sản lượng theo khu vực (Miền Bắc, Miền Trung, Miền Nam). 
- Thêm nhận xét ngắn (3–5 dòng) về xu hướng sản lượng giữa các vùng.
`,
                hint: "Dùng Insert → PivotChart để tạo biểu đồ. Kiểm tra kỹ dữ liệu đầu vào đã sạch trước khi lập bảng.",
                requires: { "Sheet Excel có những biểu đồ và nhận xét yêu cầu": "file" }
            },
            {
                context:
                    "Mụ dì ghẻ tí nữa ngất xỉu khi thấy những thử thách mà mụ nghĩ không thể nào vượt qua được, chẳng mấy chốc được Tấm làm xong. Bất lực, mụ lại đòi Tấm tính toán với dữ liệu đó.",
                description: `Bạn cần phải:
- Tính tỷ lệ sản lượng của các tỉnh: Kiên Giang
- Tổng thành tiền của Gạo ST25
- Tổng khối lượng của Hà Nội
- Tổng thành tiền của toàn bộ bảng`,
                hint: undefined,
                requires: {
                    "Tỉ lệ sản lượng của các tỉnh Kiên Giang": "number",
                    "Tổng thành tiền của gạo ST25": "number",
                    "Tổng khối lượng của Hà Nội": "number",
                    "Tổng thành tiền của toàn bộ bảng": "number"
                }
            }
        ],
        materials: {
            xlsx: "/static/debai1.xlsx"
        }
    };

    let email = $state("");
    let tokenHashed = $state("");
    let tokenAlphanumeric = $state("");
    let tokenText = $state("");
    let nickname = $state("");
    let progress: {
        section: number;
        task: number;
    } = $state({
        section: 0,
        task: 0
    });
    let error = $state("");
    let loaded = $state(false);

    let acknowledged = $state(true);

    const usersRef = collection(db, "users");

    onMount(async () => {
        let maybetokenHashed = "";
        if (page.url.searchParams.has("token")) {
            maybetokenHashed = page.url.searchParams.get("token")!;
            window.history.pushState("", "", window.location.origin + window.location.pathname);
        } else {
            maybetokenHashed = window.localStorage.getItem("tokenHashed")!;
        }
        nickname = window.localStorage.getItem("nickname")!;
        let prog = window.localStorage.getItem("progress")!;
        if (prog == "undefined") {
            progress = {
                task: 0,
                section: 0
            };
        } else {
            progress = JSON.parse(prog);
        }

        if (nickname == "undefined") {
            nickname = "";
        } else {
            nickname = JSON.parse(nickname);
        }

        if (maybetokenHashed === null) {
            tokenHashed = "";
        } else {
            tokenHashed = maybetokenHashed;
        }
        loaded = true;
        if (import.meta.env.PROD) {
            try {
                let info = await getIfExist(tokenHashed);
                window.localStorage.setItem("nickname", JSON.stringify(info.nickname));
                window.localStorage.setItem("progress", JSON.stringify(info.progress));
                nickname = info.nickname;
                progress = info.progress;
            } catch (e) {
                console.error(e);
                window.localStorage.removeItem("tokenHashed");
                window.localStorage.removeItem("nickname");
                window.localStorage.removeItem("progress");
                tokenHashed = "";
                nickname = "";
                progress = {
                    task: 0,
                    section: 0
                };
            }
        }
    });
</script>

<Navbar />
<div class="h-full w-full">
    {#if tokenHashed !== "" || !loaded}
        <div class="-z-10 opacity-0">
            <Navbar realnav={false} />
        </div>
    {/if}
    <main class="flex h-full w-full flex-row">
        {#if tokenHashed === ""}
            {#if !loaded}
                <br /><br />
                <p class="w-full text-center">Đang tải...</p>
            {:else}
                <div class="flex h-screen w-full min-w-screen flex-col items-center justify-center">
                    <h2 class="text-2xl">Nếu bạn lần đầu tới đây</h2>
                    <br />
                    <form
                        class="flex flex-col"
                        onsubmit={async () => {
                            let toktuple = generateToken();
                            await setDoc(doc(usersRef, toktuple.hash), {
                                email: email,
                                nickname: nickname,
                                progress: {
                                    section: 0,
                                    task: 0
                                }
                            });
                            tokenAlphanumeric = toktuple.tokenAlnum;
                            tokenHashed = toktuple.hash;
                            progress = {
                                section: 0,
                                task: 0
                            };
                            window.localStorage.setItem("tokenHashed", toktuple.hash);
                            window.localStorage.setItem("nickname", JSON.stringify(nickname));
                            window.localStorage.setItem(
                                "progress",
                                JSON.stringify({
                                    section: 0,
                                    task: 0
                                })
                            );
                            acknowledged = false;
                        }}
                    >
                        <input
                            placeholder="Email của bạn"
                            class="border-accent bg-bg outline-none"
                            type="email"
                            bind:value={email}
                        />
                        <input
                            placeholder="Nickname bạn muốn"
                            class="depth border-accent bg-bg outline-none"
                            type="text"
                            bind:value={nickname}
                        />
                        <button
                            type="submit"
                            class="btn w-full"
                            data-backdrop="static"
                            data-keyboard="false">Tiếp tục</button
                        >
                    </form>
                    <br /><br />
                    <h2 class="text-2xl">hoặc nếu bạn cần làm tiếp</h2>
                    <br />
                    <div class="flex flex-row">
                        <input
                            placeholder="Nhập Thần chú của bạn"
                            class="depth border-accent bg-bg font-code outline-none"
                            type="text"
                            bind:value={tokenText}
                        />
                        <button
                            class="btn"
                            onclick={async () => {
                                let alnum = toAlnumToken(tokenText.toLocaleUpperCase());
                                try {
                                    let info = await getIfExist(computeHash(alnum));
                                    tokenHashed = computeHash(alnum);
                                    nickname = info.nickname;
                                    progress = info.progress;
                                    window.localStorage.setItem("tokenHashed", tokenHashed);
                                    window.localStorage.setItem(
                                        "nickname",
                                        JSON.stringify(info.nickname)
                                    );
                                    window.localStorage.setItem(
                                        "progress",
                                        JSON.stringify(info.progress)
                                    );
                                    // window.location.reload();
                                } catch (e) {
                                    error = `${e} Liên hệ BTC nếu bạn cần hỗ trợ.`;
                                }
                            }}>Gửi</button
                        >
                    </div>
                    <br />
                    <p class="max-w-[70%] text-center text-red-400">{error}</p>
                </div>
            {/if}
        {:else if !acknowledged}
            <div class="flex flex-col gap-3 p-6 md:p-12">
                <h1 class="text-3xl">Thẻ xác minh bài làm</h1>
                <p class="font-bold text-red-500">
                    Đây là lần đầu tiên và là lần cuối cùng tấm thẻ này được hiển thị. Bạn nên chụp
                    màn hình lại tấm thẻ này.
                </p>
                <p class="text-sm font-normal">
                    Bạn sẽ không cần xác minh danh tính lại trên trình duyệt này. Tuy nhiên, nếu bạn
                    sử dụng thiết bị khác, bạn sẽ cần thông tin này để đăng nhập.
                </p>
                <div class="flex flex-row items-center gap-3">
                    <svg
                        class="w-[50%]"
                        use:qr={{
                            data: `https://butcuacotam.falcolabs.org/debai?token=${tokenAlphanumeric}`,
                            logo: logo,
                            shape: "square"
                        }}
                    />
                    <div class="flex flex-col gap-3">
                        <p>Quét mã bên hoặc nhập thần chú sau để đăng nhập:</p>
                        <code>{toTextToken(tokenAlphanumeric)}</code>
                    </div>
                </div>
                <p class="text-sm font-normal">
                    Đừng chia sẻ thần chú hay mã QR cho bất kỳ ai ngoài BTC.
                </p>

                <p class="text-sm font-normal">
                    Ban Tổ chức sẽ yêu cầu bạn cung cấp thần chú khi trao giải. Ban Tổ chức không
                    nắm giữ thần chú hay QR của bạn, chỉ có thể <a
                        href="/bao-mat"
                        class="text-accent">xác thực nó</a
                    >. Mọi thắc mắc liên hệ BTC tại support@butcuacotam.cte.vn.
                </p>
                <button
                    class="btn"
                    onclick={() => {
                        acknowledged = true;
                    }}>Tiếp tục đến bài thi <ArrowRightIcon /></button
                >
                <br />
            </div>
        {:else}
            <Competition {tokenHashed} {nickname} {progress} {challenge} />
        {/if}
    </main>
</div>

<!-- {#if tokenHashed === ""}
    <br />
{:else}
    <footer>
        <Footer />
    </footer>
{/if} -->
