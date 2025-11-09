<script lang="ts">
    import { page } from "$app/state";
    import cte from "$lib/assets/cte.svg";
    import logoLarge from "$lib/assets/logo-large.png";
    import { onMount } from "svelte";

    // @ts-ignore
    let disappearHookElement: HTMLParagraphElement = $state();
    let suckhoe = $state(false);
    onMount(() => {
        if (
            page.url.searchParams.has(
                "Minh_chao_moi_nguoi_a_Minh_rat_vui_khi_duoc_dong_hanh_voi_team_den_thoi_diem_hien_tai_nhung_vi_ly_do_suc_khoe_ca_nhan_nen_minh_xin_phep_duoc_tam_dung_vong_4_tai_day_a_Em_cung_xin_cam_on_cac_anh_chi_da_cho_em_co_hoi_de_duoc_vao_den_vong_nay_Minh_chuc_de_an_cua_nhom_se_thanh_cong_tam_biet_moi_nguoi_a"
            )
        ) {
            suckhoe = true;
            const animatedElements = document.querySelectorAll(".disappear");
            const observerOptions = {
                root: null, // relative to the viewport
                rootMargin: "0px",
                threshold: 0.5 // trigger when 50% of the element is visible
            };
            const observerCallback = (
                entries: IntersectionObserverEntry[],
                observer: IntersectionObserver
            ) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("disappear-active");
                            // Optionally, stop observing after the animation plays once
                            setTimeout(() => {
                                entry.target.classList.add("hidden");
                            }, 5000);
                            observer.unobserve(entry.target);
                        }, 1000);
                    } else {
                        // Optionally, remove the class to allow re-animation on re-entering
                        // entry.target.classList.remove('is-visible');
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            animatedElements.forEach((element) => {
                observer.observe(element);
            });
        }
    });
</script>

<div class="flex w-full flex-col items-center gap-12 border-t border-t-accent p-6">
    <div class="flex w-full flex-row items-center justify-center gap-6">
        <a href="/" aria-label="email"
            ><svg
                width="25"
                height="19"
                viewBox="0 0 25 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M24.5117 6.20117C24.707 6.05469 25 6.20117 25 6.44531V16.4062C25 17.7246 23.9258 18.75 22.6562 18.75H2.34375C1.02539 18.75 0 17.7246 0 16.4062V6.44531C0 6.20117 0.244141 6.05469 0.439453 6.20117C1.5625 7.08008 2.97852 8.1543 7.95898 11.7676C8.98438 12.5 10.7422 14.1113 12.5 14.1113C14.209 14.1113 16.0156 12.5 16.9922 11.7676C21.9727 8.1543 23.3887 7.08008 24.5117 6.20117ZM12.5 12.5C11.3281 12.5488 9.7168 11.084 8.88672 10.498C2.39258 5.81055 1.9043 5.37109 0.439453 4.19922C0.146484 4.00391 0 3.66211 0 3.27148V2.34375C0 1.07422 1.02539 0 2.34375 0H22.6562C23.9258 0 25 1.07422 25 2.34375V3.27148C25 3.66211 24.8047 4.00391 24.5117 4.19922C23.0469 5.37109 22.5586 5.81055 16.0645 10.498C15.2344 11.084 13.623 12.5488 12.5 12.5Z"
                    fill="#0798D1"
                />
            </svg></a
        >
        <a href="/" aria-label="facebook">
            <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M24.2188 12.1094C24.2188 18.1641 19.7754 23.1934 13.9648 24.0723V15.625H16.7969L17.334 12.1094H13.9648V9.86328C13.9648 8.88672 14.4531 7.95898 15.9668 7.95898H17.4805V4.98047C17.4805 4.98047 16.1133 4.73633 14.7461 4.73633C12.0117 4.73633 10.2051 6.44531 10.2051 9.47266V12.1094H7.12891V15.625H10.2051V24.0723C4.39453 23.1934 0 18.1641 0 12.1094C0 5.41992 5.41992 0 12.1094 0C18.7988 0 24.2188 5.41992 24.2188 12.1094Z"
                    fill="#0798D1"
                />
            </svg>
        </a>
        <a href="/" aria-label="threads">
            <svg
                width="32"
                height="29"
                viewBox="0 0 32 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M21.375 13.985C21.485 14.03 21.585 14.08 21.69 14.125C23.15 14.83 24.22 15.885 24.78 17.195C25.565 19.02 25.64 21.985 23.265 24.355C21.455 26.165 19.25 26.98 16.135 27.005H16.12C12.61 26.98 9.915 25.8 8.1 23.495C6.485 21.445 5.655 18.59 5.625 15.015V14.99C5.65 11.415 6.48 8.56 8.095 6.51C9.91 4.205 12.61 3.025 16.12 3H16.135C19.65 3.025 22.38 4.2 24.25 6.495C25.17 7.63 25.85 8.995 26.28 10.58L24.26 11.12C23.905 9.83 23.37 8.73 22.65 7.85C21.19 6.06 19 5.14 16.125 5.12C13.275 5.145 11.12 6.06 9.715 7.84C8.405 9.505 7.725 11.915 7.7 15C7.725 18.085 8.405 20.495 9.715 22.165C11.115 23.945 13.275 24.86 16.125 24.885C18.695 24.865 20.395 24.255 21.81 22.84C23.425 21.23 23.395 19.25 22.88 18.045C22.575 17.335 22.025 16.745 21.285 16.3C21.1 17.645 20.695 18.715 20.05 19.54C19.195 20.63 17.98 21.22 16.415 21.305C15.235 21.37 14.1 21.085 13.22 20.505C12.18 19.815 11.57 18.765 11.505 17.54C11.38 15.125 13.29 13.39 16.265 13.22C17.32 13.16 18.31 13.205 19.225 13.36C19.105 12.62 18.86 12.03 18.495 11.6C17.995 11.015 17.215 10.715 16.185 10.71H16.15C15.32 10.71 14.2 10.94 13.485 12.025L11.765 10.845C12.725 9.39 14.28 8.59 16.155 8.59H16.195C19.325 8.61 21.19 10.565 21.38 13.975L21.37 13.985H21.375ZM13.575 17.425C13.64 18.68 14.995 19.265 16.305 19.19C17.585 19.12 19.035 18.62 19.28 15.53C18.62 15.385 17.89 15.31 17.11 15.31C16.87 15.31 16.63 15.315 16.39 15.33C14.245 15.45 13.53 16.49 13.58 17.42L13.575 17.425Z"
                    fill="#0798D1"
                />
            </svg>
        </a>
    </div>

    <div class="flex w-full flex-row items-center justify-center gap-12 md:gap-24">
        <div>
            <p
                class="absolute hidden translate-x-[-110%] translate-y-[40%] text-right text-xl font-bold lg:block"
            >
                CLB KHOA HỌC CÔNG NGHỆ<br />
                TRONG KINH TẾ VÀ KINH DOANH
            </p>
            <img src={cte} class="h-12 w-auto md:h-24" alt="logo cte" />
        </div>
        <div>
            <p
                class="absolute hidden translate-x-[50%] translate-y-[40%] text-left text-xl font-bold lg:block"
            >
                DỰ ÁN <i>BỤT CỦA CÔ TẤM</i><br />
                TEAM 3, TUYỂN THÀNH VIÊN VÒNG 4
            </p>
            <img src={logoLarge} class="h-12 w-auto md:h-24" alt="logo cte" />
        </div>
    </div>

    <div class="flex flex-col items-center text-xl font-normal">
        <p class="font-semibold">Special Thanks</p>
        <div class="flex max-w-[70%] flex-row flex-wrap items-center justify-center gap-x-3">
            <p>Anh Sỹ Bách</p>
            <p>Chị Bảo Anh</p>
            <p>Anh Quang Đức</p>
            <p>Chị Huyền Linh</p>
            <p>Chị Huyền Anh</p>
            <p>Chị Ngọc Minh</p>
            <p>Anh Anh Dũng</p>
            <p>Anh Công Minh</p>
            <p>Chị Vân Chi</p>
            <p>Anh Đức Phúc</p>
        </div>
    </div>

    <div class="flex flex-col items-center text-xl font-normal">
        <p class="font-semibold" bind:this={disappearHookElement}>Thành viên Team 3</p>
        <div class="flex max-w-[70%] flex-row flex-wrap items-center justify-center gap-x-3">
            <p class="min-w-fit">Tri Phương</p>
            <p class="min-w-fit">Ngọc Minh</p>
            <p class="min-w-fit">Hoàng Việt</p>
            <p class="min-w-fit">Phương Vy</p>
            <p class="min-w-fit">Duy Hải</p>
            <p class="min-w-fit">Dương Trung</p>
            <p class="min-w-fit">Trường Anh</p>
            <p class="disappear min-w-fit" class:hidden={!suckhoe}>Huyền My</p>
            <p class="disappear min-w-fit" class:hidden={!suckhoe}>Minh Khang</p>
            <!-- <p class="min-w-fit">Huyền My</p> -->
            <!-- <p class="min-w-fit">Huyền My</p> -->
        </div>
    </div>

    <p class="text-center text-base font-normal text-fg3 md:max-w-[60%]">
        Bản quyền © 2025 CLB Khoa học Công nghệ trong Kinh tế và Kinh doanh trường Đại học Ngoại
        Thương. Chúng tôi giữ toàn quyền. Sao lưu, phân phối nội dung trong trang web này phải ghi
        rõ nguồn.
    </p>
</div>
