<script lang="ts">
    import { page } from '$app/state';

    import logoLarge from "$lib/assets/logo-large.png";
</script>

<div class="flex h-screen w-full flex-row items-center justify-center gap-12">
    <img class="w-[20%]" src={logoLarge} alt="project logo" />
    <div class="flex flex-col items-start gap-6">
        <div class="flex flex-col items-start gap-1">
            <h1 class="text-5xl">{page.status} {page.error?.message}</h1>
            <p class="text-xl">{page.status == 404 ? "Trang bạn cần tìm không tồn tại" : "Đã có lỗi xảy ra"}.</p>
        </div>
        <a href="/" class="btn"
            >Quay về trang chủ.
            <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3.75 9H14.25M14.25 9L9 3.75M14.25 9L9 14.25"
                    stroke="#100721"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </a>
    </div>
</div>

<style>
    body {
        overflow-y: hidden;
    }
</style>
